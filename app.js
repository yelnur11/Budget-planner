const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const dbURI = process.env.MONGODB_URI;
console.log('MongoDB URI:', dbURI); 

const app = express();

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(express.json());

const userRoutes = require('./api/routes/userRoutes');
const accountRoutes = require('./api/routes/accountRoutes');
const transactionRoutes = require('./api/routes/transactionRoutes');
const budgetRoutes = require('./api/routes/budgetRoutes');
const tipsRoutes = require('./api/routes/tipsRoutes');
const alertRoutes = require('./api/routes/alertRoutes');

app.use('/user', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/budget', budgetRoutes);
app.use('/tips', tipsRoutes);
app.use('/alerts', alertRoutes);

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));