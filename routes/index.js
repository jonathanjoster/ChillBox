const express = require('express');
const router = express.Router();
const Music = require('../models/music');

/* GET home page. */
router.get('/', function(req, res, next) {
  const firstCount = 5;
  var recomendOne;
  Music.count().then(c => {
    const r = Math.floor(Math.random()*(c-1));
    console.log('r======>', r);
    Music.findOne({
      offset: r
    }).then(recomend => {
      recomendOne = recomend;
      console.log(recomendOne)
    });
  }).then(() => {
    Music.findAll({
      order: [['updatedAt', 'DESC']],
      limit: firstCount
    }).then(musics => {
      res.render('index', {
        title: 'Chill Box',
        musics: musics,
        firstCount: parseInt(firstCount, 10),
        recomendOne: recomendOne
      });
    });
  });
})

router.post('/', function(req, res, next) {
  if (req.query.showed) {
    const offset = parseInt(req.query.showed, 10);
    Music.findAll({
      where: {
        // name: 'hoge'
      },
      order: [['updatedAt', 'DESC']],
      limit: 1,
      offset: offset
    }).then(musics => {
      res.send(musics);
    });
  } else if (req.query.search === 1) {
    
  }
});

module.exports = router;
