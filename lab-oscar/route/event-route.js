'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-handler.js');
const bearerAuth = require('../lib/bearer-auth-handler.js');
const Event = require('../model/event.js');

const eventRouter = module.exports = new Router();

eventRouter.post('/api/events', bearerAuth, s3Upload('eventImage'), (req, res, next) => {
  new Event({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    eventImageURI: req.s3Data.Location,
    userID: req.user._id.toString(),
  })
  .save()
  .then(event => res.json(event))
  .catch(next);
});
