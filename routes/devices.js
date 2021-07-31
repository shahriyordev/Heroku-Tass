const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/devices', function(req, res, next) {
  res.render('devices', {title: "devices"});
});






module.exports = router;
