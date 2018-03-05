'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
var index = require('../controller/index')
var lab = require('../controller/lab')
/**
 * 实验室学生的接口
 */
router.prefix('/lab')
// 获取实验室物品
router.post('/getLabGoods',lab.getLabGoods)
//实验室人员进出记录
router.post('/StaffRecord',lab.StaffRecord)
module.exports = router