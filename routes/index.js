const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const Op = require('sequelize').Op;

/**
 * show home page
 * ホームページを表示する
 */
router.get('/', function(req, res, next) {
  const firstCount = 5;
  var recomendOne;
  Music.count().then(c => {
    const r = Math.floor(Math.random()*(c-1));
    Music.findOne({
      offset: r
    }).then(recomend => {
      recomendOne = recomend;
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

/**
 * show more / word search
 * 追加表示及び単語検索処理
 */
router.post('/', function(req, res, next) {
  if (req.query.showed) {
    // show more
    const offset = parseInt(req.query.showed, 10);
    Music.findAll({
      order: [['updatedAt', 'DESC']],
      limit: 1,
      offset: offset
    }).then(musics => {
      res.send(musics);
    });
  } else if (req.query.search === '1') {
    // word search
    const word = req.body.word;
    Music.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: '%'+word+'%'
          },
          artist: {
            [Op.iLike]: '%'+word+'%'
          },
          type: word,
          attribute: word,
          note: {
            [Op.iLike]: '%'+word+'%'
          }
        }
      },
      order: [['updatedAt', 'DESC']],
    }).then(musics => {
      res.render('music-list', {
        title: `CB:${word}`,
        musics: musics
      });
    });
  }
});

module.exports = router;
