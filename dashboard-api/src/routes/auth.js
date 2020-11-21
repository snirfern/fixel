const service = require("../services/auth");
let codeRetries = {};
module.exports = function (app, middleware, upload) {
  app.get("/api/test", (req, res) => {
    res.send("working fine");
  });
  app.get("/api/codeConfirm", async (req, res) => {
    const { user_confirmation_code, email } = req.query;
    if (!user_confirmation_code || !email) {
      res.json({ success: false });
      return;
    }
    if (codeRetries[email]) {
      if (codeRetries[email] > 3) {
        res.json({ success: false, msg: "Retries limit expired" });
        return;
      }
      codeRetries[email]++;
    } else codeRetries[email] = 1;

    const checkCodeRes = await service.CheckConfirmationCode(
      email,
      user_confirmation_code
    );
    res.json({ success: checkCodeRes, msg: "Confirmation code is incorrect" });

    console.log(req);
  });

  app.post("/api/signUp", async (req, res) => {
    const { email, full_name, password } = req.body;
    if (!email || !full_name || !password) {
      res.json({ success: false });
      return;
    }

    //check user existence
    const serviceRes = await service.signUp(
      {
        userID: email,
        full_name: full_name,
        password: password,
      },
      "userID"
    );
    if (serviceRes < 0 || !serviceRes) {
      res.json({
        success: false,
        msg: "Error ocuured",
      });
      return;
    }
    res.json({ success: true });
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ success: false });
      return;
    }

    serviceRes = await service.login(email, password);
    if (serviceRes && serviceRes.isConfirmed) {
      res.json({
        success: true,
        status: serviceRes.isConfirmed > 0 ? 1 : -1,
        data: serviceRes,
      });
      return;
    }
    res.json({ succes: false });

    return;
  });

  app.post("/api/updateUserDetails", upload.any(), async (req, res) => {
    const { profile_img, profile_bio, userID } = req.body;
    const toUpdate = {
      profile_bio: profile_bio,
      profile_img: profile_img,
    };
    const updateBucketRes = await service.updateUserBucket(
      "fixelus3rs",
      userID,
      toUpdate
    );
    res.json({ success: updateBucketRes && updateBucketRes > 0 ? 1 : -1 });
  });
};
