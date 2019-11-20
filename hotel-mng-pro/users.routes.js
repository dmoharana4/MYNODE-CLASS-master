var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users.routes');
router
.route('/user')
.get(userCtrl.getUser)
.post(userCtrl,add.User)
.put(userCtrl,add.User);
Router
.route('/users')
.get(userCtrl,getUsers);

module.exports= router;
