const pool = require('../config/db');

// POST /playlists
exports.createPlaylist = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO playlists (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /playlists/:playlistId/videos/:videoId
exports.addVideoToPlaylist = async (req, res) => {
  const { playlistId, videoId } = req.params;
  try {
    // Verificar que existan ambas entidades
    const playlist = await pool.query('SELECT id FROM playlists WHERE id = $1', [playlistId]);
    const video = await pool.query('SELECT id FROM videos WHERE id = $1', [videoId]);
    if (playlist.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist no encontrada' });
    }
    if (video.rows.length === 0) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }

    await pool.query(
      'INSERT INTO playlist_videos (playlist_id, video_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [playlistId, videoId]
    );
    res.status(200).json({ message: 'Video agregado a la playlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /playlists/:id (con los videos)
exports.getPlaylistWithVideos = async (req, res) => {
  const { id } = req.params;
  try {
    // Obtener playlist
    const playlistResult = await pool.query('SELECT * FROM playlists WHERE id = $1', [id]);
    if (playlistResult.rows.length === 0) {
      return res.status(404).json({ error: 'Playlist no encontrada' });
    }
    const playlist = playlistResult.rows[0];

    // Obtener videos asociados
    const videosResult = await pool.query(
      `SELECT v.* FROM videos v
       INNER JOIN playlist_videos pv ON v.id = pv.video_id
       WHERE pv.playlist_id = $1
       ORDER BY pv.added_at ASC`,
      [id]
    );

    res.json({
      ...playlist,
      videos: videosResult.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};