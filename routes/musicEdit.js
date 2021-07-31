const express = require('express');
const Music = require('../model/Music');
const router = express.Router();
const eA = require('../middleware/eA');

/* GET users listing. */
router.get('/edit/:id', eA, function(req, res, next) {
//   res.render('MusicEdit', {title: "Musiqa o`zgartirish sahifasi"});

  Music.findById(req.params.id, (err, musics)=> {
    res.render('musicEdit', {
        title: 'Musiqa o`zgartirish sahifasi',
        musics,
    })
  })
});
	

/* Post users listing. */
router.post('/edit/:id', function(req, res, next) {
  const music = {} // object yaratib ichiga name larni qo`shdik.
  music.name = req.body.name;
  music.lastname = req.body.lastname;
  music.parol = req.body.parol;
  music.phone = req.body.phone;
  music.password = req.body.password;
  music.imgUrl = req.body.imgUrl;

  const query = {_id: req.params.id}; // idsini o`zgaruvchiga olyapmiz va updateda chqirib ishlatyapmiz

  Music.update(query ,music, (err) => {
      if(err) console.log(err);
      res.redirect("/")
  })
});



module.exports = router;
