'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {


  try {
    if (!req.headers.authorization) { res.status(403).send('Not Authorized'); }

    let basic = req.headers.authorization;
    let basicStr = basic.split(' ').pop();
    let [username, pass] = base64.decode(basicStr).split(':');
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};