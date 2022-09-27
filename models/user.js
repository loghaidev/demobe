const short = require('short-uuid');
const bcrypt = require('../services/bcrypt');

const { timezone } = require('../configs/timezone');

class User {
  constructor(info) {
    this.id = short.generate();
    this.first_name = info.first_name;
    this.last_name = info.last_name;
    this.avatar = info.avatar || '';
    this.role = info.role || 'customer';
    this.phone = info.phone;
    this.username = info.username;
    this.password = bcrypt.hash(info.password);
    this.create_at = timezone().format();
    this.is_active = info.is_active | true;
  }
}

module.exports = { User };
