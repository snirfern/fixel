var jwt = require("jsonwebtoken");

const beautifyDate = (datePrm) => {
  if (datePrm === null || datePrm === undefined || date.toString().length < 5) {
    let nd = new Date();
    return nd.getMonth() + 1 + "/" + nd.getDate() + "/" + nd.getFullYear();
  }

  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const tokenize = async (data) => {
  try {
    const tRes = await jwt.sign(data, process.env.secret);
    return tRes;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

const deTokenize = async (token) => {
  try {
    const dRes = await jwt.verify(token, process.env.secret);
    return;
  } catch (e) {
    console.log(e);
    return -1;
  }
};
module.exports = {
  beautifyDate: beautifyDate,
  tokenize: tokenize,
  deTokenize: deTokenize,
};
