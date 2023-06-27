const express = require('express');
//import passport to check user authentication
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/delete/:id',passport.checkAuthentication, postController.delete);
router.get('/update',postController.update);

module.exports = router;