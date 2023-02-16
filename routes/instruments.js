const express = require('express');
const router = express.Router();
const Instrument = require('../models/Instrument');


/* GET search results */
/* ROUTE /instruments/search */
router.get('/search',isLoggedIn, async function (req, res, next) {
  const { searchBrand } = req.query;
  const user = req.session.currentUser;
    try {
      instruments = await Instrument.find({ 
        $or: [
        { brand: { $regex: new RegExp(searchBrand, 'i') } },
        ] 
      });
    res.render('search', { query: searchBrand, instruments, user });
  } catch (error) {
    next(error)
  }
});

/* Get edit form view */
/*ROUTE /instruments/edit/:instrumentId */
router.get('/edit/:instrumentId', isLoggedIn, async function (req, res, next) {
  const { instrumentId } = req.params;
  const user = req.session.currentUser
  try {
    const instrument = await Instrument.findById(instrumentId);
    res.render('editInstrument',  { instrument, user });
  } catch (error) {
    next(error)
  }
});

/* POST get users instrument inputs */
/* ROUTE /instrument/new */
router.post('/edit/:instrumentId', isLoggedIn, async function (req, res, next) {
  const { brand, model, year, type, image, description } = req.body;
  const { instrumentId } = req.params;
  try {
    await Instrument.findByIdAndUpdate(instrumentId, { brand, model, year, type, image, description }, { new: true });
    res.redirect(`/instruments/${instrumentId}`);
  } catch (error) {
    next(error)
  }
});

/* GET form view */
/* ROUTE /instruments/new */
router.get('/new', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
    res.render('newInstrument', {user});
  });

/* POST form view */
/* ROUTE /instruments/new */
  router.post('/new', isLoggedIn, async function (req, res, next) {
    const { brand, model, year, type, madeIn, image, description } = req.body;
    const user = req.session.currentUser
    try {
      const createdInstrument = await Instrument.create({ owner: user._id, brand, model, year, type, madeIn, image, description });
      res.redirect(`/instruments/${createdInstrument._id}`);
    } catch (error) {
      next(error)
    }
  });

/* GET delete instrument */
/* ROUTE /instruments/delete/:id */
router.get('/delete/:instrumentId', isLoggedIn, async function (req, res, next) {
  const { instrumentId } = req.params;
  try {
    const instrument = await Instrument.findById(instrumentId);
    await Instrument.deleteOne({ _id: instrumentId })
    res.redirect(`/`);
  } catch (error) {
    next(error)
  }
});


/* GET one instrument */
/* ROUTE /instrument/:instrumentId */
router.get('/:instrumentId', isLoggedIn, async function (req, res, next) {
  const { instrumentId } = req.params;
  const user = req.session.currentUser;
  try {
    const instrument = await Instrument.findById(instrumentId);
    const isOwner = user._id == instrument.owner ? true : false;
    res.render('detail', { instrument , isOwner, user });
  } catch (error) {
    next(error)
  }
});

module.exports = router;