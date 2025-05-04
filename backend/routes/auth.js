// backend/routes/auth.js
const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const User     = require('../models/User');

const router = express.Router();

// POST /api/auth/login
// backend/routes/auth.js
router.post('/login', async (req, res) => {
    try {
      // 1) Ver qué llega en el body
      console.log('▶️  /api/auth/login body:', req.body);
  
      const { email, password } = req.body;
      if (!email || !password) {
        console.log('❌  Falta email o password');
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
      }
  
      // 2) Busca el usuario
      const user = await User.findOne({ email });
      console.log('🔍  Usuario encontrado:', user);
  
      if (!user) {
        console.log('❌  Usuario no existe');
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // 3) Comprueba la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('🔑  Contraseña válida?:', isMatch);
  
      if (!isMatch) {
        console.log('❌  Password incorrecta');
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // 4) Firma y responde
      const payload = { sub: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('✅  Login OK, token creado');
  
      res.json({ token });
    } catch (err) {
      console.error('🔥  Error en /api/auth/login:', err);
      res.status(500).json({ message: 'Error interno' });
    }
  });
  
module.exports = router;
