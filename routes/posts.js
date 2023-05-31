const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts_controller');

router.get('/create',postController.create);
router.get('/delete',postController.delete);
router.get('/update',postController.update);

module.exports = router;