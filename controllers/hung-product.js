const { timezone } = require('../configs/timezone');
const moment = require('moment-timezone');
const db = require('../configs/db');
const { ObjectId, ISODate } = require('mongodb');
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

    const productsList = await productsDB.find({
      ...query,
    });

    const totalQuery = await productsList.count();

    const allProduct = await productsList.toArray();

    console.log(allProduct);
    res
      .json({
        data: allProduct,
        success: true,
        total: totalQuery,
        page: query.page,
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
      return {
        id: e.id,
        name: e.name,
        price: +e.price,
        sex: e.sex,
        type: e.type,
        description: e.description,
        images: [e.image1, e.image2, e.image3],
        count: e.count,
        created_date: timezone().format(),
      };
    });

    if (req.body) {
      await productsDB.insertMany(body);
    }
    // console.log(req);

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
