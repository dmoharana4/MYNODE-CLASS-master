var express = require('express');
var router = express.Router();
// const userController = require('../controller/users.controller');
const authCtrl = require('../controller/auth.controller');

router
    .route('/users')
    .get(authCtrl.getUsersData)

router
    .route('/users/:userId')
    .put(authCtrl.changePassword)

router
    .route('/register')
    .post(authCtrl.registration)
router
    .route('/login')
    .post(authCtrl.login)
   

router
    .route('/token')
    .get(authCtrl.validateToken)
    
    
module.exports = router ;