require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/User.routes');
const walletRoutes = require('./routes/Wallet.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on('error', (err) => console.log('DB error: ' + err));
db.once('open', () => console.log('DB connected'));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: ' + (process.env.PORT || 8000));
});
