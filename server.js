require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');
const { connectRedis } = require('./src/config/redis');

// Importar rutas
const videoRoutes = require('./src/routes/videoRoutes');
const playlistRoutes = require('./src/routes/playlistRoutes');
const checkpointRoutes = require('./src/routes/checkpointRoutes');

const app = express();
app.use(express.json());

// Servir el frontend estático
app.use(express.static('public'));

// Montar las rutas de la API
app.use('/videos', videoRoutes);
app.use('/playlists', playlistRoutes);
app.use('/checkpoints', checkpointRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  // Probar PostgreSQL
  try {
    const pgRes = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL conectado:', pgRes.rows[0].now);
  } catch (err) {
    console.error('❌ Error PostgreSQL:', err.message);
  }
  // Conectar Redis
  await connectRedis();
});