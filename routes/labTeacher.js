'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
var index = require('../controller/index')
var lab = require('../controller/lab')
var labt = require('../controller/labt')
/**
 * 实验室老师的接口
 */
router.prefix('/labt')

//上传实验室信息
router.post('/upoadLabInfo',labt.updateLabInfo)
//上传实验室图片
router.post('/updateLabImg',labt.updateLabImg)

module.exports = router