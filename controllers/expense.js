const { timezone } = require('../configs/timezone');
const moment = require('moment-timezone');
const db = require('../configs/db');
const { ObjectId, ISODate } = require('mongodb');
const expense = db.collection('expense');
const getExpense = async (req, res) => {
  try {
    let filterDateCondition = {
      $gte: timezone().startOf('month').format(),
      $lte: timezone().endOf('month').format(),
    };
    if (req.query?.from) {
      filterDateCondition['$gte'] = timezone(req.query.from)
        .startOf('day')
        .format();
    }
    if (req.query?.to) {
      filterDateCondition['$lte'] = timezone(req.query.to)
        .endOf('day')
        .format();
    }
    const expenseList = await expense
      .find({
        created_date: filterDateCondition,
      })
      .toArray();

    let total = expenseList?.reduce(
      (a, b) => a + (b.type == 'spend' ? b.value : 0),
      0
    );
    res
      .json({ data: expenseList, total_cost: total, success: true })
      .status(200);
  } catch (err) {
    console.log(err);
    res.json({ data: [], message: err, success: false }).status(500);
  }
};

const addExpense = async (req, res) => {
  try {
    let body = req.body?.map((e) => {
      return { ...e, created_date: timezone().format() };
    });

    // console.log(req);
    await expense.insertMany(body);

    res.json({ success: true, data: body }).status(200);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const updateExpense = async (req, res) => {
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

const getDataStatis = async (req, res) => {
  try {
    let filterDateCondition = {
      $gte: timezone().startOf('day').format(),
      $lte: timezone().endOf('day').format(),
    };
    if (req.query?.from) {
      filterDateCondition['$gte'] = timezone(req.query.from)
        .startOf('day')
        .format();
    }
    if (req.query?.to) {
      filterDateCondition['$lte'] = timezone(req.query.to)
        .endOf('day')
        .format();
    }
    const expenseList = await expense
      .find({
        created_date: filterDateCondition,
      })
      .toArray();

    let statisData = {};

    res
      .json({ data: statisData, total_cost: total, success: true })
      .status(200);
  } catch (e) {
    console.log(e);
    res.json({ data: {}, message: err, success: false }).status(500);
  }
};

module.exports = {
  getExpense,
  addExpense,
  updateExpense,
  getDataStatis,
};
