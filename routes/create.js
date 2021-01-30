const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const dateFormat = require('dateFormat');

// show create page
router.get('/', (req, res, next) => {
  res.render('create', { title: 'CB:Create' });
});

// create
router.post('/', (req, res, next) => {
  const updatedAt = dateFormat(new Date(), 'mmm dd yyyy, HH:MM:ss');
  Music.create({
    name: req.body.name || 'NONAME',
    artist: req.body.artist,
    url: req.body.url,
    type: req.body.type,
    attribute: req.body.attribute,
    updatedAt: updatedAt,
    note: req.body.note
  }).then(music => {
    Music.bulkCreate(music).then(() => {
      res.redirect('/');
    });
  }).catch(err => {
    err.status = 404;
    next(err);
  })
});

module.exports = router;
