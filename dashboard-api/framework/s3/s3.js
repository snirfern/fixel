const AWS = require("aws-sdk");

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
const s3 = new AWS.S3();

var that = {};
module.exports = (() => {
  that.uploadItem = async function (bucketName, filePath, fileContent) {
    return new Promise((resolve) => {
      var params = {
        Bucket: bucketName,
        Key: filePath,
        // ContentType: "image/jpeg",

        Body: JSON.stringify(fileContent),
      };
      s3.upload(params, function (err, data) {
        if (err) console.log(err);
        resolve(data.Bucket ? 1 : -1);
      });
    });
  };

  that.downloadItem = async function (bucketName, filePath) {
    return new Promise((resolve) => {
      var params = {
        Bucket: bucketName,
        Key: filePath,
      };
      s3.getObject(params, function (err, data) {
        if (data && data.Body) {
          resolve(data.Body.toString());
          return;
        }
        resolve(-1);
        return;
      });
    });
  };

  that.listItems = async function (bucketPath, prefix) {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: bucketPath,

        Prefix: prefix,
      };
      s3.listObjects(params, function (err, data) {
        if (err) {
          console.log(err);
          resolve(-1);
        } else resolve(data);
      });
    });
  };
  return that;
})();
