const express = require('express');
const router = express.Router();
const Music = require('../models/music');

/* GET home page. */
router.get('/', function(req, res, next) {
  Music.findAll({
    where: {
      // name: 'hoge'
    },
    order: [['updatedAt', 'DESC']]
  }).then(musics => {
    res.render('index', {
      title: 'Chill Box',
      musics: musics
    });
  });
});

module.exports = router;
