const nodemailer = require("nodemailer");

const mailer = async (recipient, template, confirmationCode) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return new Promise(async (resolve) => {
    try {
      await transporter.sendMail({
        from: process.env.HOST_EMAIL,
        to: recipient,
        subject: "Fixel test confirmation code",
        text: "your confirmaton code is: " + confirmationCode,
      });
      resolve(1);
    } catch (e) {
      console.log(e);
      resolve(-1);
    }
  });
};

module.exports = mailer;
