const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {title: "Dashboard"});
});






module.exports = router;
