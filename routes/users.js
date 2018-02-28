'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
var lab = require('../controller/lab')
var index = require('../controller/index')
/**
 * 普通用户的接口
 */
// 规定每个接口前缀为user
router.prefix('/user')
  //上传文件接口

// 上传文件
router.post('/uploadHeadImg', user.uploadHeadImg)
// 获取用户信息
router.post('/getUserInfo',user.getUserInfo)
// 修改用户信息
router.post('/modUserInfo',user.modUserInfo)
// 查询昵称是否存在
router.post('/queryUname',user.queryUname)
// 查询邮箱是否存在
router.post('/queryEmail',user.queryEmail)
// 修改密码
router.post('/alterPasswd',user.alterPasswd)
//找回密码
router.post('/getBackPass',user.getBackPass)
//退出登录
router.post('/exitLogin',user.exitLogin)
//获取实验室荣誉
router.post('/queryGlory',index.queryGlory)
//申请项目接口
router.post('/applyProject',user.applyProject)
//申请项目接口
router.post('/applyProPlan',user.applyProPlan)
//获取消息
router.post('/getMessgae',user.getMessgae)
//获取基本消息
router.post('/getBaseMessgae',user.getBaseMessgae)
//获取用户参与的项目
router.post('/getOwnPro',user.getOwnPro)
//获取实验室的信息
router.post('/getLabInfoById',user.getLabInfoById)
module.exports = router
