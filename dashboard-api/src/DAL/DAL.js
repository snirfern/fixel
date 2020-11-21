const dynamoDB = require("../../framework/dynamoDB/dynamoDB");
var that = {};

that.searchItemByID = async function (searchDic) {
  const dbSearchRes = await dynamoDB.searchItemByID(searchDic);
  return dbSearchRes;
};
that.inserItem = async function (itemIn, keyToSearch) {
  const dbInsertRes = await dynamoDB.insertItem(itemIn);
  return dbInsertRes;
};

that.updateField = async function (identifier, item) {
  const updateDbRes = await dynamoDB.updateFields(identifier, item);
  return updateDbRes;
};
that.scan = async function (item, expression) {
  const scanRes = await dynamoDB.query(item, expression);
  return scanRes;
};
module.exports = that;
