'use strict';

const { users } = require('../models')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }
    console.log('here in middleware')
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    console.log('after authenticate')
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}