const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/debug', function(req, res, next) {
  res.render('debug', {title: "Debug"});
});






module.exports = router;
