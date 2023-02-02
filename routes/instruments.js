const express = require('express');
const router = express.Router();
const Instrument = require('../models/Instrument');

/* GET form view */
/* ROUTE /shows/new */
router.get('/new', /*isLoggedIn,*/ function (req, res, next) {
    res.render('newInstrument');
  });

  router.post('/new', /*isLoggedIn,*/ async function (req, res, next) {
    const { brand, model, year, type, image, description } = req.body;
    try {
      const createdInstrument = await Instrument.create({ brand, model, year, type, image, description git });
      res.redirect(`/instrument/${createdInstrument._id}`);
    } catch (error) {
      next(error)
    }
  });

  module.exports = router;