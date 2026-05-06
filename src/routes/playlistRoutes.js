const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.post('/', playlistController.createPlaylist);
router.post('/:playlistId/videos/:videoId', playlistController.addVideoToPlaylist);
router.get('/:id', playlistController.getPlaylistWithVideos);

module.exports = router;