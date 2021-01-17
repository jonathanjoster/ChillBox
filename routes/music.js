const express = require('express');
const router = express.Router();
const Music = require('../models/music');

router.get('/:name', (req, res, next) => {
  Music.findOne({
    where: {
      name: req.params.name
    }
  }).then((music) => {
    if (music) {
      res.render('music', {
        title: `CB:${music.name}`,
        music: music
      });
    } else {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  });
});

module.exports = router;
