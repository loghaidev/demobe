const express = require('express');
const {
  getExpense,
  addExpense,
  updateExpense,
} = require('../controllers/expense');
const router = express.Router();

let endpoint = {
  expense: '/api/expense',
};

router.get(endpoint.expense, getExpense);
router.post(endpoint.expense, addExpense);
router.put(`${endpoint.expense}/:id`, updateExpense);

module.exports = router;
