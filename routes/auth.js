'use strict';

let express = require('express');
let router = express.Router();

router.post('/facebook', (req, res) => {
  console.log('facebook code: ', req.body.code);
  res.send();
});

module.exports = router;
