// backend/server.js
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
require('dotenv').config();             // carga JWT_SECRET y MONGO_URI

// Importa tu ruta de autenticación:
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());                // para leer JSON del body

// 🌟 monta la ruta de login en /api/auth
app.use('/api/auth', authRoutes);

// Puedes conservar aquí otras rutas de prueba, o eliminarlas si ya no las usas:
// app.get('/test-all', ...);

// Conecta a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error de MongoDB:', err));

// Levanta el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
