require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors(), express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('API OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend on http://localhost:${PORT}`));
