const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const dateFormat = require('dateFormat');

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

router.get('/:name/edit', (req, res, next) => {
  Music.findOne({
    where: {
      name: req.params.name
    }
  }).then((music) => {
    if (music) {
      res.render('edit', {
        title: `CB:Edit`,
        music: music
      });
    } else {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  });
});

router.post('/:name', (req, res, next) => {
  console.log(req.params.name)
  Music.findOne({
    where: {
      name: req.params.name
    }
  }).then((music) => {
    if (music && parseInt(req.query.edit) === 1) {
      const updatedAt = dateFormat(new Date(), 'mmm dd yyyy, HH:MM:ss');
      console.log(req.body.url.includes('https'))
      const url = req.body.url.includes('https') ?
        req.body.url :
        'https://www.' + req.body.url;
      music.update({
        name: req.body.name,
        artist: req.body.artist,
        url: url,
        type: req.body.type,
        attribute: req.body.attribute,
        updatedAt: updatedAt,
        note: req.body.note
      }).then(music => {
        Music.bulkCreate(music).then(() => {
          res.redirect('/musics/' + music.name);
        });
      });
    } else {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  });
});

module.exports = router;
