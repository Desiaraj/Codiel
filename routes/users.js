const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);

router.get('/signup',userController.signUp);

router.get("/signin",userController.signIn);

router.post('/create_user',userController.create);

router.post('/create-session',userController.createSession);

router.get('/signout',userController.signout);

module.exports = router;