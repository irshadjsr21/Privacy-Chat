/**
 * This will return all the essential middleware to
 * initialize the server.
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csurf = require('csurf');

module.exports = [
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  csurf({
    cookie: true
  }),
  express.static(path.join(__dirname, '../', 'public')),
];