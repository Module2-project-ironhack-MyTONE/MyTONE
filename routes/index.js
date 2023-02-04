const express = require('express');
const router = express.Router();
const Instrument = require('../models/Instrument');

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', async function (req, res, next) {
  const user = req.session.currentUser;
  try {
    const instruments = await Instrument.find({});
    res.render('instrumentView', { instruments, user });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
