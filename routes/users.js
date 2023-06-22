const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication, userController.profile);

router.get('/signup',userController.signUp);

router.get("/signin",userController.signIn);

router.post('/create_user',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/signin',
        failWithError:true,
        failureMessage:true
    }
),userController.createSession);

router.get('/signout',userController.clearSession);

module.exports = router;