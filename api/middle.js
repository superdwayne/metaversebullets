const express = require('express')
const middleware = require('./middleware');
const router = express.Router();
const { mongoFind, mongoInsert, mongoUpdate, mongoRemove } = require('./mongo')
var path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express()
require('dotenv').config();

function verifyLogin(req, res, next) {


}

module.exports = {
  verifyLogin: verifyLogin
}
