'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
var index = require('../controller/index')
var lab = require('../controller/lab')
router.prefix('/lab')
// 获取实验室物品
router.post('/getLabGoods',lab.getLabGoods)
module.exports = router