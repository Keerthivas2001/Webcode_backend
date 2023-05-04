var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/count', function(req, res, next) {
  res.status(200).send({
    "Service Request":5,
    "Leads":12,
    "Contacts":4
  });
});

module.exports = router;
