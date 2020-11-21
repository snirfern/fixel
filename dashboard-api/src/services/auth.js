const DAL = require("../DAL/DAL");
const Utils = require("../Utils/Utils");
const s3 = require("../../framework/s3/s3");
const mailer = require("../Utils/mailer/mailer");
var that = {};

that.updateUserBucket = async function (bucketName, userID, content) {
  userID = await Utils.tokenize(userID);
  const filePath = "bios/" + userID.toString();

  const uploadRes = await s3.uploadItem(bucketName, filePath, content);
};

that.CheckConfirmationCode = async function (email, code) {
  const emailToken = await Utils.tokenize(email);
  const searchItem = await DAL.searchItemByID({ userID: emailToken });
  const isValidCode =
    searchItem &&
    searchItem.confirmation_code &&
    searchItem.confirmation_code.toString() === code.toString();
  if (isValidCode) DAL.updateField({ userID: emailToken }, { isConfirmed: 1 });

  return isValidCode ? 1 : -1;
};
that.login = async function (email, password) {
  try {
    const emailToken = await Utils.tokenize(email);
    const passwordToken = await Utils.tokenize(password);

    let searchItemRes = await DAL.scan(
      { userID: emailToken, password: passwordToken },
      "#userID=:userID and #password=:password"
    );
    if (!searchItemRes || searchItemRes < 0) {
      return -1;
    }
    let data = {
      full_name: searchItemRes.full_name,
      email: email,
      isConfirmed: searchItemRes.isConfirmed,
    };

    let filePath = "bios/" + emailToken;
    const bio = await s3.downloadItem("fixelus3rs", filePath);
    if (!bio || bio < 0) return data;
    let parsed = JSON.parse(bio);
    if (parsed) return { ...parsed, ...data };

    return {};
  } catch (e) {
    console.log(e);
    return -1;
  }
};

that.signUp = async function ({ userID, full_name, password }) {
  const confirmationCode = new Date().valueOf();
  const mailerRes = await mailer(userID, null, confirmationCode);
  if (!mailerRes || mailerRes < 0) {
    res.json({ success: false });
    return;
  }
  const tokenizedUserID = await Utils.tokenize(userID);
  const tokenizedPassword = await Utils.tokenize(password);
  const doesExist = await DAL.searchItemByID({ userID: tokenizedUserID });
  if (!doesExist || doesExist < -1) return -1;
  const insertItemRes = await DAL.inserItem(
    {
      userID: tokenizedUserID,
      full_name: full_name,
      password: tokenizedPassword,
      confirmation_code: confirmationCode,
      isConfirmed: -1,
    },
    "userID"
  );
  return insertItemRes;
};
module.exports = that;
