'use strict';
var querystring = require('querystring')
var result = require('../result/result')
var user = require('../modles/user')
var config = require('../config/githubconfig')
var path = require('path')
var fs = require('fs')
const uuidV1 = require('uuid/v1')
var mail = require('../config/mailConfig')
module.exports = {
    //注册用户
    async register(ctx) {

    },

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
        if (ctx.request.body) {
            console.log(ctx.request.body)
            var id = ctx.request.body.id
        } else {
            var id = ctx.session.user.id
            ctx.body = result(-2, '未登录')
        }
        await User.findOne({
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
            if (newpath.endsWith('.png')) {
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
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        var randomNum = ''
        for (var i = 0; i < 6; i++) {
            let str = chars[Math.floor(Math.random() * 36)]
            randomNum += str
        }
        let identifyCode = randomNum
        let tomail = ctx.request.body.email
        let title = '邮箱注册'
        let content = `<h3>您的验证码为${identifyCode}</h3>`
        let result = '邮件已经发送'
        let message = await mail.mailSend(ctx, tomail, title, content, result)
        ctx.session.identifyCode = identifyCode
        if(message){
            ctx.body = result(1, '发送成功')
        }else {
            ctx.body = result(0,'服务器错误')
        }
       
    },
    /**
     * 邮箱验证码的验证
     */
    async mailSure(ctx) {
        let identifyCode = ctx.request.body.identifyCode
        if (identifyCode == ctx.session.identifyCode) {
            ctx.body = result(1, '验证成功')
        } else if (identifyCode !== ctx.session.identifyCode) {
            ctx.body = result(-1, '验证码错误')
        } else {
            ctx.body = result(0, '服务器错误')
        }
    }
}