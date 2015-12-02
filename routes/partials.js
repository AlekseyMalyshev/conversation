'use strict';

let express = require('express');
let router = express.Router();

let auth = require('../config/auth');

router.get('/:name', (req, res) => {
  res.render('partials/' + req.params.name);
});

module.exports = router;
