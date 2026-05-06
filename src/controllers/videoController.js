const pool = require('../config/db');

// POST /videos
exports.createVideo = async (req, res) => {
  const { titulo, descripcion, categoria, url_video } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO videos (titulo, descripcion, categoria, url_video) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, descripcion, categoria, url_video]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /videos?search=termino
exports.getAllVideos = async (req, res) => {
  const { search } = req.query;
  try {
    let query = 'SELECT * FROM videos';
    const params = [];
    if (search) {
      query += ' WHERE titulo ILIKE $1';
      params.push(`%${search}%`);
    }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /videos/:id
exports.updateVideo = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, categoria, url_video } = req.body;
  try {
    const result = await pool.query(
      'UPDATE videos SET titulo = $1, descripcion = $2, categoria = $3, url_video = $4 WHERE id = $5 RETURNING *',
      [titulo, descripcion, categoria, url_video, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /videos/:id
exports.deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM videos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json({ message: 'Video eliminado', video: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};