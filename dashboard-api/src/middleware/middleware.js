module.exports = async function (req, res, next) {
  const { body } = req;
  next();
};
