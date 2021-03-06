const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const dateFormat = require('dateformat');

/**
 * show all list
 * 曲一覧のページを表示する
 */
router.get('/', (req, res, next) => {
  Music.findAll({
    order: [['updatedAt', 'DESC']],
  }).then((musics) => {
    if (musics) {
      res.render('music-list', {
        title: `CB:list`,
        musics: musics
      });
    } else {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  });
});

/**
 * show a specific page
 * 特定の一曲のページを表示する
 */
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

/**
 * show edit page
 * 編集ページを表示する
 */
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

/**
 * update / delete data
 * 編集または削除処理
 */
router.post('/:name', (req, res, next) => {
  if (req.body.note === 'DELETE') {
    // delete
    Music.findOne({
      where: {
        name: req.body.name
      }
    }).then(music => {
      if (music) {
        music.destroy();
        res.redirect('/');
      } else {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      }
    });
    return;
  }
  // edit
  Music.findOne({
    where: {
      name: req.params.name
    }
  }).then((music) => {
    if (music && parseInt(req.query.edit) === 1) {
      const updatedAt = dateFormat(new Date(), 'mmm dd yyyy, HH:MM:ss');
      const name = req.body.name.replace('?', '_').replace('&', '_');
      music.update({
        name: name,
        artist: req.body.artist,
        url: req.body.url,
        type: req.body.type,
        attribute: req.body.attribute,
        updatedAt: updatedAt,
        note: req.body.note
      }).then(music => {
        Music.bulkCreate(music).then(() => {
          res.redirect('/music/' + music.name);
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
