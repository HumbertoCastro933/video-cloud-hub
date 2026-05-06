require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');
const { connectRedis } = require('./src/config/redis');

// Importar rutas
const videoRoutes = require('./src/routes/videoRoutes');
const playlistRoutes = require('./src/routes/playlistRoutes');

const app = express();
app.use(express.json());

// Rutas
app.use('/videos', videoRoutes);
app.use('/playlists', playlistRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  // Probar conexión a PostgreSQL
  try {
    const pgRes = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL conectado:', pgRes.rows[0].now);
  } catch (err) {
    console.error('❌ Error PostgreSQL:', err.message);
  }
  // Conectar Redis
  await connectRedis();
});