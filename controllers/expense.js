const { timezone } = require('../configs/timezone');
const db = require('../configs/db');
const expense = db.collection('expense');
const getExpense = async (req, res) => {
  try {
    const expenseList = await expense.find({}).toArray();

    let total = expenseList?.reduce((a, b) => a + b.value, 0);
    res
      .json({ data: expenseList, total_cost: total, success: true })
      .status(200);
  } catch (err) {
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

module.exports = {
  getExpense,
  addExpense,
};
