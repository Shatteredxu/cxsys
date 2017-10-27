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

// 获取用户信息
router.post('/getUserInfo',user.getUserInfo)
// 分页获取项目
router.post('/getProject',index.getProject)
// 分页获取实验室
router.post('/getLab',index.getLab)
module.exports = router