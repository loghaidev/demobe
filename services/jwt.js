const jwt = require('jsonwebtoken');

var createToken = (tokenData) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: tokenData },
      process.env.TOKEN_KEY,
      {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

var verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  createToken,
  verifyToken,
};
