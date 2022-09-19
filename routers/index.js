const express = require('express');
const {
  getExpense,
  addExpense,
  updateExpense,
} = require('../controllers/expense');
const { count } = require('../controllers/countVisitor');
const {
  getProducts,
  updateProduct,
  addProducts,
} = require('../controllers/hung-product');
const router = express.Router();

let endpoint = {
  expense: '/api/expense',
  countVisitor: '/api/count',
  hungProducts: '/api/hung/products',
};

router.get(endpoint.expense, getExpense);
router.post(endpoint.expense, addExpense);
router.put(`${endpoint.expense}/:id`, updateExpense);

router.get(endpoint.countVisitor, count);

router.get(endpoint.hungProducts, getProducts);
router.post(endpoint.hungProducts, addProducts);
router.put(`${endpoint.hungProducts}/:id`, updateProduct);

module.exports = router;
