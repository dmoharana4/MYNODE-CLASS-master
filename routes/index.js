var express = require('express');
var app = express();
var router = express.Router();
var dataCtrl= require('../controller/data.controller');
// var dataController = require('../controller/hotels.controller');
router
.route("/data")
.get(dataCtrl.dataController)
module.exports = router;
