const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Instrument = require('../models/Instrument');
const instruments = require('../data/instruments');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .then(() => {
    return Instrument.deleteMany({});
  })
  .then(() => {
    return Instrument.create(instruments)
  })
  .then(createdInstruments => console.log(`Inserted ${createdInstruments.length} instruments in the database`))
  .then(() => mongoose.connection.close())
  .catch(err => console.error(err))