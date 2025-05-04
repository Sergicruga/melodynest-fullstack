// backend/seed.js
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const users = [
    { username: 'melody1', email: 'melody1@tests.com', password: 'pass123' },
    { username: 'melody2', email: 'melody2@tests.com', password: 'pass456' },
    { username: 'melody3', email: 'melody3@tests.com', password: 'pass789' }
  ];

  for (let u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    await User.create({
      username: u.username,
      email: u.email,
      password: hash,
      role: 'user'
    });
    console.log(`Usuario ${u.username} creado`);
  }

  console.log('¡Seed completado!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
