const { createClient } = require('redis');

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
});

// Conectar al iniciar (se llamará desde server.js)
async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('✅ Redis conectado');
    return redisClient;
  } catch (err) {
    console.error('❌ Error conectando a Redis:', err.message);
    process.exit(1); // Fallo crítico si se necesita Redis
  }
}

module.exports = { redisClient, connectRedis };