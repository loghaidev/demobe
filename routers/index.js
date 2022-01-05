const express = require('express');
const { getExpense, addExpense } = require('../controllers/expense');
const router = express.Router();

let endpoint = {
  expense: '/api/expense',
};

router.get(endpoint.expense, getExpense);
router.post(endpoint.expense, addExpense);

module.exports = router;
