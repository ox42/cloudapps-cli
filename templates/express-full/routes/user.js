var express = require('express');

var helpers = require('./helpers');
var router = express.Router();

router.get('/dashboard', helpers.verifyAuthorized, asyncWrap(async (req, res) => {

  let notes = await models.Note.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'ASC']], raw: true });

  return res.render('dashboard', {
    notes: notes
  });
}));


router.get('/note/add', helpers.verifyAuthorized, asyncWrap(async (req, res) => {

  return res.render('note-add');
}));

router.post('/note/add', helpers.verifyAuthorized, asyncWrap(async (req, res) => {

  let data = {
    title: (req.body && req.body.title) ? _.trim(req.body.title) : '',
    content: (req.body && req.body.content) ? _.trim(req.body.content) : '',
  };

  if (!data.title || !data.content) {
    return res.status(400).send({ message: 'Invalid data. Please complete all fields and try again. '});
  }


  await models.Note.create({
    title: data.title,
    content: data.content,

    userId: req.user.id,
    addedOn: new Date()
  });

  return res.send({ status: 'Success' });
}));



router.get('/note/:id/edit', helpers.verifyAuthorized, asyncWrap(async (req, res) => {

  let note = await models.Note.findOne({ where: { id: req.params.id, userId: req.user.id }, raw: true });

  if (!note) {
    return res.redirect('/user/dashboard');
  }

  return res.render('note-edit', {
    note: note
  });
}));


router.post('/note/:id/edit', helpers.verifyAuthorized, asyncWrap(async (req, res) => {

  let data = {
    title: (req.body && req.body.title) ? _.trim(req.body.title) : '',
    content: (req.body && req.body.content) ? _.trim(req.body.content) : '',
  };

  if (!data.title || !data.content) {
    return res.status(400).send({ message: 'Invalid data. Please complete all fields and try again. '});
  }


  let note = await models.Note.findById(req.params.id);

  if (!note || note.get('userId') != req.user.id) {
    return res.status(400).send({ message: "This note doesn't belong to you." });
  }

  note.set('title', data.title);
  note.set('content', data.content);
  await note.save();

  return res.send({ status: 'Success' });
}));

module.exports = router;
