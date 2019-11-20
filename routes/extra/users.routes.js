var express = require('express');
var router = express.Router();
const userController = require('../../controller/extra/users.controller');


router
     .route('/users')
     .get(userController.getUsersData)

router
    .route('/users/new')
    .post(userController.addUserNew)

router
    .route('/users/:userId')
    .get(userController.getUserData)

    
module.exports = router ;