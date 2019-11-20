var express = require('express');
var router = express.Router();
var homeControl = require('../controller/home.controller');
router.route("/home").get(homeControl)
module.exports= router;
