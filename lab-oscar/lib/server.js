'use strict';

//npm modules
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

//config mongoose to connec to db
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

//create server app
const app = express();

//load middleware
app.use(morgan('dev'));
app.use(cors());



// //    * load routes
// app.use(require('../route/auth-router.js'))
//
// // add 404 route
// app.all('/api/*', (req, res, next) => res.sendStatus(404))
//
// //    * load error middleware
// app.use(require('./error-middleware.js'))

//start and stop database

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server is running on PORT ', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('server is already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn){
      return server.http.close(() => {
        server.isOn = false;
        console.log('server just got killed');
        resolve();
      });
    }
    reject(new Error('server is not runnnig'));
  });
};
