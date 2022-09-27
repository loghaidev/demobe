const bcrypt = require('../services/bcrypt');
const { timezone } = require('../configs/timezone');
const moment = require('moment-timezone');
const db = require('../configs/db');
const { User } = require('../models/user');
const usersDB = db.collection('user');
const jwt = require('../services/jwt');

const login = async (req, res, next) => {
  try {
    ['username', 'password'].map((properties) => {
      if (req.body[properties] == undefined) {
        throw new Error(`400: Thiếu thuộc tính ${properties}`);
      }
    });
    const username = req.body.username.toLowerCase();
    let [user] = await usersDB.find({ username }).toArray();
    if (!user) {
      throw new Error(`400: Tài khoản không tồn tại!`);
    }
    if (user.is_active == false) {
      throw new Error(`400: Số điện thoại chưa được kích hoạt!`);
    }
    if (!bcrypt.compare(req.body.password, user.password)) {
      throw new Error(`400: Mật khẩu không chính xác!`);
    }
    delete user.password;
    let [accessToken, refreshToken] = await Promise.all([
      jwt.createToken(user, process.env.ACCESS_TOKEN_LIFE),
      jwt.createToken(user, process.env.REFRESH_TOKEN_LIFE),
    ]);
    res.send({
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    ['username', 'password', 'phone'].map((properties) => {
      if (req.body[properties] == undefined) {
        throw new Error(`400: Thiếu thuộc tính ${properties}`);
      }
    });
    req.body.username = String(req.body.username).trim().toLowerCase();
    let user = await usersDB.findOne({
      $or: [{ username: req.body.username }, { phone: req.body.phone }],
    });
    if (user) {
      throw new Error('400: Tên tài khoản hoặc số điện thoại đã được sử dụng!');
    }
    let _user = new User(req.body);
    let insert = await usersDB.insertOne(_user);
    if (!insert.insertedId) {
      throw new Error('500: Đăng ký thất bại!');
    }
    res.send({ success: true, data: _user });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
