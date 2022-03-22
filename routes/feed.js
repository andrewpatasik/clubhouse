const express = require('express');
const router = express.Router();

const feedController = require('../controllers/feedController');

router.get('/', feedController.feed);

router.post('/post', feedController.feed_post);

router.get('/:user/post/:id', feedController.feed_user_post);

module.exports = router;
