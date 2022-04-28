const moment = require('moment-timezone');
const TIMEZONE = 'Europe/London';

const timezone = (time) => {
  return moment(time).tz(TIMEZONE);
};

module.exports = { timezone };
