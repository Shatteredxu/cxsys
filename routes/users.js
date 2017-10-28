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
// 修改密码
router.post('/alterPasswd',user.alterPasswd)
//找回密码
router.post('/getBackPass',user.getBackPass)
module.exports = router
