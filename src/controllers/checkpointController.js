const { redisClient } = require('../config/redis');

// POST /checkpoints
exports.saveCheckpoint = async (req, res) => {
  const { videoId, second } = req.body;
  if (!videoId || second === undefined) {
    return res.status(400).json({ error: 'videoId y second son requeridos' });
  }
  try {
    await redisClient.set(`checkpoint:${videoId}`, second.toString());
    res.json({ message: 'Checkpoint guardado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /checkpoints/:videoId
exports.getCheckpoint = async (req, res) => {
  const { videoId } = req.params;
  try {
    const second = await redisClient.get(`checkpoint:${videoId}`);
    res.json({ second: second ? parseFloat(second) : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};