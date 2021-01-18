const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const dateFormat = require('dateFormat');

router.get('/', (req, res, next) => {
  res.render('create', { title: 'CB:Create' });
});

router.post('/', (req, res, next) => {
  const updatedAt = dateFormat(new Date(), 'mmm dd yyyy, HH:MM:ss');
  const url = req.body.url.includes('https') ?
    req.body.url :
    'https://www.' + req.body.url;
  Music.create({
    name: req.body.name || 'NAME',
    artist: req.body.artist,
    url: url,
    type: req.body.type,
    attribute: req.body.attribute,
    updatedAt: updatedAt,
    note: req.body.note
  }).then(music => {
    console.log(music)
    Music.bulkCreate(music).then(() => {
      // res.redirect('/musics/' + music.name);
      res.redirect('/');
    });
  });
});

module.exports = router;
