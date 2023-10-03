const express = require('express');
const {
    getExpense,
    addExpense,
    updateExpense,
    getDataStatistic,
    deleteExpense
} = require('../controllers/expense');
const { count } = require('../controllers/countVisitor');
const {
    getProducts,
    updateProduct,
    addProducts,
    createPayment
} = require('../controllers/hung-product');
const { login, register } = require('../controllers/authentication');
const router = express.Router();

let endpoint = {
    expense: '/api/expense',
    countVisitor: '/api/count',
    auth: '/api/auth',
    hungProducts: '/api/hung/products'
};

router.get(endpoint.expense, getExpense);
router.get(`${endpoint.expense}/statistic`, getDataStatistic);
router.post(endpoint.expense, addExpense);
router.put(`${endpoint.expense}/:id`, updateExpense);
router.delete(`${endpoint.expense}/:id`, deleteExpense);

router.get(endpoint.countVisitor, count);

router.get(endpoint.hungProducts, getProducts);
router.post(endpoint.hungProducts, addProducts);
router.put(`${endpoint.hungProducts}/:id`, updateProduct);

router.post(`${endpoint.auth}/login`, login);
router.post(`${endpoint.auth}/register`, register);

router.post('/create_payment_url', createPayment);

module.exports = router;
