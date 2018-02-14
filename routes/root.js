'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
var index = require('../controller/index')
var lab = require('../controller/lab')
/**
 * root用户接口
 */
router.prefix('/root')
// 获取实验室物品
router.post('/getLabGoods',lab.getLabGoods)
module.exports = router