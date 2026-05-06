const express = require('express');
const router = express.Router();
const checkpointController = require('../controllers/checkpointController');

router.post('/', checkpointController.saveCheckpoint);
router.get('/:videoId', checkpointController.getCheckpoint);

module.exports = router;