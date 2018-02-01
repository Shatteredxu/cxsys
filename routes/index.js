'use strict';
const router = require('koa-router')()
var config = require('../config/githubconfig')
const fetch = require('node-fetch');
var user = require('../controller/user')
var index = require('../controller/index')
//登录接口
router.post('/login', index.login)
// 注册用户接口
router.post('/register',index.register)
// github第三方登录接口
router.get('/github/login', async (ctx) => {
  var path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&scope=${config.scope}`
  ctx.redirect(path)
}).get('/github/oauth/callback', user.githubLogin)

// 分页获取项目
router.post('/getProject',index.getProject)
// 分页获取实验室
router.post('/getLab',index.getLab)
// 获取全部项目
router.post('/getAllProject',index.getAllProject)
// 获取全部实验室
router.post('/getAllLab',index.getAllLab)
// 获取老师（分页）
router.post('/getTeacher',index.getTeacher)
//邮箱zhuce
router.post('/mailRegister', user.mailRegister)
//邮箱验证
router.post('/mailSure', user.mailSure)
//通过用户名或邮箱或手机号查询头像
router.post('/QueryIMG', index.QueryIMG)
//最新公告
router.post('/queryNotice',index.queryNotice)
//获取最近项目列表
router.post('/queryNotice',index.queryNotice)
module.exports = router