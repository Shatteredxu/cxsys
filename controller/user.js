'use strict';
var querystring = require('querystring')
var result = require('../result/result')
var user = require('../modles/user')
var config = require('../config/githubconfig')
var path = require('path')
var fs = require('fs')
const uuidV1 = require('uuid/v1')
var mail = require('../config/mailConfig')
var token1 = require('../config/jsonWebToken')
var crypto = require('../config/cryptoConfig')
var common = require('../common/common')
/**
 * 需要登陆的请求
 * 1.github第三方登录
 * 2.获取用户信息
 * 3.修改用户信息
 * 4.修改头像
 * 5.邮箱验证码的发送
 * 6.修改密码
 */
module.exports = {
    /**
     * github第三方登录
     */
    async githubLogin() {
        const code = ctx.query.code
        let path = 'https://github.com/login/oauth/access_token'
        const params = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            code: code
        }
        await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => {
            return res.text()
        }).then(result => {
            var arry = result.split('&')
            var tokenlist = arry[0].split('=')
            var token = tokenlist[1]
            console.log(token)
            return token
        }).then(async (token) => {
            const url = `https://api.github.com/user?access_token=${token}`
            await fetch(url).then(res => {
                return res.json()
            }).then(async (res1) => {
                // 此处获得从github上获取的信息
                await ctx.render('homepage', { username: res1.login })
            })
        })
    },
    /* 
    *上传文件接口
    */
    async uploadFile(ctx) {

    },
    /**
     * 获取用户信息
     */
    async getUserInfo(ctx) {
        if (ctx.request.body == {}) {
            console.log("sdsdw", ctx.request.body)
            var id = ctx.request.body.id
        } else {
            // let webToken = ctx.request.header.authorization
            // console.log("sdsd",ctx.request.header.authorization)
            // var token = token1.encryptToken(webToken)
            var id = ctx.session.id
        }
        await user.findOne({
            where: { 'id': id },
            'attributes': ['id', 'name', 'headImg', 'power', 'email', 'pid', 'sex', 'phone', 'sid']
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(Error => {
            ctx.body = result(0, '服务器错误')
        })
    },
    /**
     * 修改用户信息
     */
    async modifyInfo(ctx) {
        let s = ctx.request.body

    },
    /**
     * 修改头像
     * @param {*} ctx 
     */
    async uploadHeadImg(ctx) {
        const filePaths = [];
        var res;
        const files = ctx.request.body.files || {};
        for (let key in files) {
            const file = files[key];
            let fileName = file.name
            let array = fileName.split('.')
            let fileString = array[1]
            var homeDir = path.resolve(__dirname, '..')
            var newpath = `${homeDir}/public/${uuidV1()}.${fileString}`;
            if (newpath.endsWith('.png') || newpath.endsWith('.gif') || newpath.endsWith('.jpg')) {
                const reader = fs.createReadStream(file.path);
                const writer = fs.createWriteStream(newpath);
                reader.pipe(writer);
                let arraypath = newpath.split('/')
                let UUidName = arraypath[arraypath.length - 1]
                let databasePath = `/public/images/${UUidName}`
                let uid = ctx.session.id
                if (uid) {
                    await user.update({
                        headImg: databasePath
                    },
                        {
                            where: { id: uid }
                        }).then((res) => {
                            ctx.body = result(1, "")
                        }).catch(Error => {
                            ctx.body = result(0, "")
                        })
                } else {
                    ctx.body = result('-1', "未登录")
                }
            } else {
                ctx.body = result(-2, '格式不正确')
            }
        }
    },
    /**
    * 邮箱验证码的发送
    * @param {object} ctx 
    * @param {object} next 
    */
    async mailRegister(ctx, next) {
        let identifyCode = common.getIdentifyCode()
        let tomail = ctx.request.body.email
        let title = '邮箱注册'
        let content = `<h3>您的验证码为${identifyCode}</h3>`
        let message = await mail.mailSend(ctx, tomail, title, content)
        ctx.session.identifyCode = identifyCode
        if (message) {
            ctx.body = result(1, '发送成功')
        } else {
            ctx.body = result(0, '服务器错误')
        }
    },
    /**
     * 邮箱验证码的验证
     */
    async mailSure(ctx) {
        let identifyCode = ctx.request.body.identifyCode
        console.log(ctx.session.identifyCode)
        if (identifyCode == ctx.session.identifyCode) {
            ctx.body = result(1, '验证成功')
        } else if (identifyCode !== ctx.session.identifyCode) {
            ctx.body = result(-1, '验证码错误')
        } else {
            ctx.body = result(0, '服务器错误')
        }
    },
    /**
     * 修改密码
     * @param {*} ctx 
     */
    async alterPasswd(ctx) {
        let s = ctx.request.body
        let oldPass = s.oldPass
        let newPass = s.newPass
        let uid = ctx.session.id
        if (uid) {
            let oldMd5 = crypto.getMd5(oldPass)
            var res = await user.findOne({ where: { id: uid } })
            if (res.password == oldMd5) {
                let newMd5 = crypto.getMd5(newPass)
                await user.update({ password: newMd5 }, {
                    where: { id: uid }
                }).then(res=>{
                    ctx.body = result(1,'修改成功')
                }).catch(Error =>{
                    ctx.body = result(0,'服务器错误')
                })
            }else {
                console.log
                ctx.body = result(-1,'原密码错误')
            }
        } else {
            ctx.body = result(-2, '未登录')
        }
    },
    /**
     * 邮箱找回密码
     * @param {*} ctx 
     */
    async getBackPass(ctx){
        let tomail = ctx.request.body.email
        let identifyCode = common.getIdentifyCode()
        let title = '找回密码'
        let content = `<h3>您的验证码为${identifyCode}</h3>`
        let message = await mail.mailSend(ctx, tomail, title, content)
        ctx.session.identifyCode = identifyCode
        if (message) {
            ctx.body = result(1, '发送成功')
        } else {
            ctx.body = result(0, '服务器错误')
        }
    },
}