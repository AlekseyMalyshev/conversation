'use strict';

let express = require('express');
let router = express.Router();

router.get('/facebook', (req, res) => {
  console.log('facebook auth: ', req.body);
  console.log('facebook auth: ', req.params);
  res.send();
});

module.exports = router;
