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
      console.log({ product: req.query.product });
      query['id'] = +req.query.product;
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

module.exports = {
  getProducts,
  addProducts,
  updateProduct,
};
