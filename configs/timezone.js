const moment = require('moment-timezone');

const timezone = (time) => {
  return moment().tz('Europe/London');
};

module.exports = { timezone };
