const { timezone } = require('../configs/timezone');
const moment = require('moment-timezone');
const db = require('../configs/db');
const { ObjectId, ISODate } = require('mongodb');
const { Products } = require('../models/products');
const productsDB = db.collection('hung-products');
const getProducts = async (req, res) => {
  try {
    let query = {};
    // let filterDateCondition = {
    //   $gte: timezone().startOf('month').format(),
    //   $lte: timezone().endOf('month').format(),
    // };
    // if (req.query?.from) {
    //   filterDateCondition['$gte'] = timezone(req.query.from)
    //     .startOf('day')
    //     .format();
    // }
    // if (req.query?.to) {
    //   filterDateCondition['$lte'] = timezone(req.query.to)
    //     .endOf('day')
    //     .format();
    // }
    if (req.query?.product) {
      query['id'] = +req.query.product;
    }

    if (req.query?.gender) {
      query['sex'] = req.query.gender;
    }

    const pageSize =
      (req.query.pageSize && parseInt(req.query?.pageSize)) || 20;

    const page = (req.query.page && parseInt(req.query?.page)) || 1;

    const [allProducts, totalQuery] = await Promise.all([
      productsDB
        .find({
          ...query,
        })
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .toArray(),
      productsDB
        .find({
          ...query,
        })
        .count(),
    ]);

    res
      .json({
        data: allProducts,
        success: true,
        total: totalQuery,
        page: page,
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res.json({ data: [], message: err, success: false }).status(500);
  }
};

const addProducts = async (req, res) => {
  try {
    let body = req.body?.map((e) => {
      return new Products(e);
    });

    if (req.body) {
      await productsDB.insertMany(body);
    }

    res.json({ success: true, data: body }).status(200);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const updateProduct = async (req, res) => {
  try {
    var result = await expense.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    console.log(result);
    res.json({ success: true, data: req.body });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

function createPayment(req, res, next) {
  var ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // var config = require('config');

  var tmnCode = '2ZZ171YY';
  var secretKey = 'PJYSLBHOBZVGKLRDFVSTKDEDDCNZOPRN';
  var vnpUrl = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  var returnUrl = 'http://localhost:8000/payment/vnpay_return';

  var date = moment();

  var createDate = date.format('yyyyMMDDHHmmss');
  var orderId = date.format('HHmmss');

  console.log({ createDate, orderId });
  var amount = 0;
  var bankCode = 33;

  var orderInfo = ' ' || req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;
  if (locale === null || locale === '') {
    locale = 'vn';
  }
  var currCode = 'VND';
  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.0.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = orderInfo;
  vnp_Params['vnp_OrderType'] = orderType;
  vnp_Params['vnp_Amount'] = 10000;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  // vnp_Params = sortObject(vnp_Params);

  var querystring = require('qs');
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require('crypto');
  var hmac = crypto.createHmac('sha512', secretKey);
  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
  console.log(vnp_Params);

  res.send(vnpUrl);
}

module.exports = {
  getProducts,
  addProducts,
  updateProduct,
  createPayment,
};
