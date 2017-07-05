'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing event router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/events', () => {
    it('should respond with an event', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/events`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'Garage Sale')
        .field('description', 'Come to our g sale')
        .field('location', '1234 some ST')
        .field('eventImage', `${__dirname}/assets/eventImage.jpg`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Garage Sale');
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.eventImageURI).toExist();
      });
    });
  });
});
