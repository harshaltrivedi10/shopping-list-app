const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const keys = require('./config/keys');

const app = express();

// body-parser middleware
app.use(bodyParser.json());

// Database config
const db = keys.MONGO_URI;
// connect to the db
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the MongoDB');
  })
  .catch(error => console.log(error));

// Use routes
app.use('/api/items/', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
