require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de PostgreSQL
const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'video_cloud_hub',
});

// Configuración de Redis
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
});

// Función de prueba de conexiones
async function testConnections() {
  try {
    const pgRes = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL conectado:', pgRes.rows[0].now);
  } catch (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
  }

  try {
    await redisClient.connect();
    const pong = await redisClient.ping();
    console.log('✅ Redis conectado:', pong);
  } catch (err) {
    console.error('❌ Error conectando a Redis:', err.message);
  }
}

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Video Cloud Hub funcionando' });
});

// Iniciar servidor y testear conexiones
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  await testConnections();
});