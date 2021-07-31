const express = require('express');
const Music = require('../model/Music');
const router = express.Router();
const eA = require('../middleware/eA')

/* GET users listing. */
router.get('/add', eA,  function (req, res, next) {
  res.render('MusicAdd', { title: "Musiqa qo`shish sahifasi" });
});


/* Post users listing. */
router.post('/add', function (req, res, next) {
  // console.log('jo`natdik');


  req.checkBody('name', 'iltimos musiqani nomini yozing').notEmpty()
  // req.checkBody('lastname', 'iltimos musiqani avtorini yozing').notEmpty()
  req.checkBody('parol', 'iltimos musiqani izohini yozing').notEmpty()
  req.checkBody('phone', 'iltimos musiqani nomini yozing').notEmpty()
  req.checkBody('password', 'iltimos musiqani avtorini yozing').notEmpty()
  req.checkBody('imgUrl', 'iltimos musiqani izohini yozing').notEmpty()

  const errors = req.validationErrors()

  if (errors) {
    res.render('musicAdd', {
      title: "Musiqa qo`shishda validator ishlayapdi",
      errors: errors
    })
  }
  else {
    const music = new Music();
    music.name = req.body.name;
    music.lastname = req.user._id;
    music.parol = req.body.parol;
    music.phone = req.body.phone;
    music.password = req.body.password;
    music.imgUrl = req.body.imgUrl;

    music.save((err) => {
      if (err) console.log(err);
      else {
        req.flash('alert alert-success', 'Musiqa qo`shildi')
        res.redirect('/')
      }
    })
  }


});



module.exports = router;
