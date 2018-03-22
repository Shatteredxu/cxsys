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
router.post('/updateLabInfo',labt.updateLabInfo)
//上传实验室图片
router.post('/updateLabImage',labt.updateLabImage)
//添加学生
router.post('/addLabStu',labt.addLabStu)
//删除实验室学生
router.post('/deleteUser',labt.deleteUser)
//获取实验室用户
router.post('/getLabUser',labt.getLabUser)
//获取实验室当前项目
router.post('/getLabPro',labt.getLabPro)
//编辑项目信息
router.post('/editLabInfo',labt.editLabInfo)
//删除项目
router.post('/deletePro',labt.deletePro)
//查询实验成果
router.post('/getLabGlory',labt.getLabGlory)
//查询实验成果
router.post('/deleteGlory',labt.deleteGlory)
//实验室成果添加
router.post('/addLabGlory',labt.addLabGlory)
//发送公告
router.post('/sendNotice',labt.sendNotice)
//老师添加新项目
router.post('/addNewPro',labt.addNewPro)
//获取指定实验室老师
router.post("/getLabTeacher",labt.getLabTeacher)
//shi验室人员出勤情况
router.post("/getRecord",labt.getRecord)
//修改实验室成果
router.post("/updateLabGlory",labt.updateLabGlory)
module.exports = router