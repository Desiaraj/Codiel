const express = require('express');
//import passport to check user authentication
const passport = require('passport');
const router = express.Router();

const commentController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentController.create);

router.get('/delete/:id',passport.checkAuthentication,commentController.delete);

module.exports = router;