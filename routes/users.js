'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
// 规定每个接口前缀为users
router.prefix('/user')
  //上传文件接口

// 上传文件
router.post('/uploadHeadImg', user.uploadHeadImg)
// 获取用户信息
router.post('/getUserInfo',user.getUserInfo)
// 获取用户信息
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
module.exports = router
