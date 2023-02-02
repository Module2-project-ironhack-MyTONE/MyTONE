const express = require('express');
const router = express.Router();
const Instrument = require('../models/Instrument');


/* GET all instruments */
/* ROUTE /instruments */
router.get('/', async function (req, res, next) {
  try {
    const instruments = await Instrument.find({});
    res.render('instrumentView', { instruments });
  } catch (error) {
    next(error)
  }
});

/* GET search results */
/* ROUTE /instruments/search */
router.get('/search', async function (req, res, next) {
  const { brand } = req.query;
  try {
    const instrument = await Instrument.findOne({ brand: brand });
    res.render('search', { query: brand, instrument: instrument });
  } catch (error) {
    next(error)
  }
});


/* Get edit form view */
/*ROUTE /instruments/edit/:instrumentId */
router.get('/edit/:instrumentId', /*isLoggedIn,*/ async function (req, res, next) {
  const { instrumentId } = req.params;
  try {
    const instrument = await Instrument.findById(instrumentId);
    res.render('editInstrument', instrument);
  } catch (error) {
    next(error)
  }
});

/* POST get users instrument inputs */
/* ROUTE /instrument/new */
router.post('/edit/:instrumentId', /*isLoggedIn,*/ async function (req, res, next) {
  const { brand, model, year, type, image, description } = req.body;
  const { instrumentId } = req.params;
  try {
    const editedInstrument = await Instrument.findByIdAndUpdate(instrumentId, { brand, model, year, type, image, description }, { new: true });
    res.redirect(`/instruments/${editedInstrument._id}`);
  } catch (error) {
    next(error)
  }
});



/* GET form view */
/* ROUTE /instruments/new */
router.get('/new', /*isLoggedIn,*/ function (req, res, next) {
    res.render('newInstrument');
  });

  router.post('/new', /*isLoggedIn,*/ async function (req, res, next) {
    const { brand, model, year, type, image, description } = req.body;
    try {
      const createdInstrument = await Instrument.create({ brand, model, year, type, image, description });
      res.redirect(`/instruments/${createdInstrument._id}`);
    } catch (error) {
      next(error)
    }
  });



  /* GET delete instrument */
/* ROUTE /instruments/delete/:id */
/* router.get('/delete/:instrumentId', isLoggedIn, async function (req, res, next) {
  const { instrumentId } = req.params;
  try {
    const instrument = await Instrument.findById(instrumentId);
    await Season.deleteMany({ _id: { $in: show.seasons } });
    await Review.deleteMany({ show: showId }) 
    await Instrument.deleteOne({ _id: instrumentId })
    res.redirect(`/instrument`);
  } catch (error) {
    next(error)
  }
});
*/

/* GET one instrument */
/* ROUTE /instrument/:instrumentId */
/* router.get('/:instrumentId', async function (req, res, next) {
  const { instrumentId } = req.params;
  const user = req.session.currentUser;
  try {
    const instrument = await Instrument.findById(instrumentId).populate('seasons');
    const reviews = await Review.find({ instrument: instrumentId });
    res.render('detail', { show, reviews, user });
  } catch (error) {
    next(error)
  }
});
*/
  

module.exports = router;