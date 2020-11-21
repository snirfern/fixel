const Utils = require("../Utils/Utils");
module.exports = {
  user: function (userID,fullName,userBio) {
    return {
     userID: userID || new Date().valueOf(),
      fullName: fullName || "",
      date: Utils.beautifyDate(new Date()),
      bio:userBio||""
      
    };
  },

