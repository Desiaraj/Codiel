//All routers handled here 

//Here the express is reused because the instance is already created in root index.js file 

const express = require('express');
const homeController = require('../controllers/homeControllers');

const router = express.Router();


console.log("router loaded");

router.get('/',homeController.home);
router.get('/dashboard',homeController.dashboard);

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));

//exports the router to all modules 

module.exports = router;