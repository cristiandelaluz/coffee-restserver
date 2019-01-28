const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const app = express();

app.get('/users', function(req, res) {
  const from = Number(req.query.from) || 0;
  const limit = Number(req.query.limit) || 5;

  User.find({}, 'name email role state google img')
    .skip(from)
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      User.countDocuments({}, (err, counter) => {
        res.json({
          ok: true,
          users,
          counter
        });
      })

    });
});

app.get('/user/:id', function (req, res) {
  res.json('get user');
});

app.post('/user', function(req, res) {
  const body = req.body;

  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    // user.password = null;

    res.json({
      ok: true,
      user
    })
  });

});

app.put('/user/:id', function(req, res) {
  const id = req.params.id;
  const body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

  User.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user
    })
  });
});

app.delete('/user/:id', function(req, res) {
  res.json('delete user');
});

module.exports = app;
