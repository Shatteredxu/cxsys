'use strict';
const router = require('koa-router')()
var user = require('../controller/user')
// 规定每个接口前缀为users
router.prefix('/user')
  //上传文件接口

// 上传文件
router.post('/uploadHeadImg', user.uploadHeadImg)

//邮箱修改密码
router.post('/mailRegister', user.mailRegister)

//邮箱验证
router.post('/mailSure', user.mailSure)

module.exports = router
