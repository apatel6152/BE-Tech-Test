const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const acronymRoutes = require('./routes/acronym.js');


const app = express();
const mongoURL = 'mongodb+srv://amit:amit12345@cluster0.px7izcc.mongodb.net/?retryWrites=true&w=majority'

// configure body-parser to handle JSON data
app.use(bodyParser.json());

// connect to the MongoDB database
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
}).catch(err => {
  console.log('Cannot connect to the database', err);
  process.exit();
});

app.use('/acronym', acronymRoutes)

app.get('/', (req, res) => { 
    res.json({ message: 'Welcome to the Acronym API ' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});