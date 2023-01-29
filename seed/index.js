const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Instrument = require('../models/Instrument');
const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.pjygiq8.mongodb.net/myToneDB';
const instruments = require('../data/instruments');

mongoose.connect(MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .then(() => {
    return Instrument.create(instruments)
  })
  .then(createdInstruments => console.log(`Inserted ${createdInstruments.length} instruments in the database`))
  .then(() => mongoose.connection.close())
  .catch(err => console.error(err))