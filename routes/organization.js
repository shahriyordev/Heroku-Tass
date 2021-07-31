const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/organization', function(req, res, next) {
  res.render('organization', {title: "Dashboard"});
});






module.exports = router;
