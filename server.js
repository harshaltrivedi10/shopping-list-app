const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const config = require('config');

const app = express();

// body-parser middleware
app.use(express.json());

// Database config
const db = config.get('MONGO_URI');
// connect to the db
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to the MongoDB');
  })
  .catch(error => console.log(error));

// Use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
