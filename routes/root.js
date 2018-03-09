'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
var index = require('../controller/index')
var lab = require('../controller/lab')
var root = require('../controller/root')
/**
 * root用户接口
 */
router.prefix('/root')
// 获取实验室物品
router.post('/getLabGoods',lab.getLabGoods)
//修改实验室老师
router.post('/editLabTea',root.editLabTea)

module.exports = router