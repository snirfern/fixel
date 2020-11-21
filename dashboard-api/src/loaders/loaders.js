const bodyParser = require("body-parser");
require("dotenv").config();
const middleware = require("../middleware/middleware");
const cors = require("cors");
var multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const express = require("express");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mocks

//
module.exports = {
  upload: upload,
  app: app,
  middleware: middleware,
};
