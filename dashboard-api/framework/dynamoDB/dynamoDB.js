var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
var docClient = new AWS.DynamoDB.DocumentClient();
const table = "fixel_users";

var that = {};
module.exports = (() => {
  that.insertItem = async function (item) {
    let params = {
      TableName: table,
      Item: {},
    };
    Object.keys(item).forEach((cK) => (params["Item"][cK] = ""));
    Object.keys(item).forEach((cK) => {
      if (item[cK]) params["Item"][cK] = item[cK];
    });

    return new Promise((resolve, reject) => {
      docClient.put(params, function (err, data) {
        if (err && err.statusCode) {
          reject(-1);
          console.log("Error occured on insert item dynamoDB");
          return;
        }
        console.log("Add item successfully!");
        resolve(1);
      });
    });
  };

  that.updateFields = async function (identifier, item) {
    let params = {
      TableName: table,
      Key: {
        ...identifier,
      },
      UpdateExpression: "set",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    };
    Object.keys(item).forEach((cK) => {
      params.UpdateExpression += ` #${cK} = :${cK}`;

      params.ExpressionAttributeNames[`#${cK}`] = cK;
      params.ExpressionAttributeValues[`:${cK}`] = item[cK];
    });

    return new Promise((resolve) => {
      docClient.update(params, function (err, data) {
        if (err) {
          resolve(-1);
          return;
        }
        resolve(1);
      });
    });
  };
  that.query = async function (item, KeyConditionExpression) {
    let params = {
      TableName: table,
      FilterExpression: KeyConditionExpression,
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    };
    Object.keys(item).forEach((cK) => {
      params.ExpressionAttributeNames[`#${cK}`] = cK;
      params.ExpressionAttributeValues[`:${cK}`] = item[cK];
    });
    return new Promise((resolve) => {
      docClient.scan(params, function (err, data) {
        console.log(err);
        if (
          data &&
          data.Count &&
          data.Count > 0 &&
          data.Items &&
          data.Items[0]
        ) {
          resolve(data.Items[0]);
          return;
        }
        resolve(-1);
      });
    });
  };

  that.searchItemByID = async function (dic) {
    var params = {
      TableName: table,
      Key: {},
    };

    Object.keys(dic).forEach((cK) => {
      params["Key"][cK] = dic[cK];
    });
    return new Promise((resolve, reject) => {
      docClient.get(params, function (err, data) {
        if ((err && err.statusCode) || data === null) {
          resolve(-1);
          return;
        }

        resolve(data && data.Item ? data.Item : -1);
      });
    });
  };

  return that;
})();
