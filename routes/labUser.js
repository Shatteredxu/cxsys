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
//删除实验室物品
router.post('/DeleteGoods',lab.DeleteGoods)
// 修改实验室物品
router.post('/AlterGoods',lab.AlterGoods)
//添加实验室物品
router.post('/addLabGoods',lab.addLabGoods)
//添加物品图片
router.post('/addGoodsImage',lab.addGoodsImage)
// 导出实验室物品
router.post('/exportGoods',lab.exportGoods)
//删除表格
router.post('/deleteSheet',lab.deleteSheet)
router.post('/exportRecord',lab.exportRecord)
module.exports = router