const index = require('./routes/index')
const users = require('./routes/users')
const labUser = require('./routes/labUser')
var user = require('./modles/user')
var result = require('./result/result')
var labTeacher = require('./routes/labTeacher')
var root = require('./routes/root')


module.exports.initialize = function (app) {
    /**
     * 定义路由，分发请求
     */
    // 用户不需要登录的请求
    app.use(index.routes(), index.allowedMethods())
    // 判断用户是否登录
    // 普通用户请求 
    app.use((ctx, next) => {
        if (ctx.session.id) {
            return next();
            console.log(ctx.session.id)
        } else {
            // ctx.redirect('/login');// 未登录则跳转到登陆界面
            ctx.session.id = 5
            ctx.request.header.authorization = "fTzoHpIVSdCxKxxC2mMYkVW7v6hL9Ah6kkayMuM"
            console.log("ctx.session.id")
            return next();
        }
    });
    app.use(users.routes(), users.allowedMethods())
    // 实验室用户请求
    app.use(async (ctx, next) => {
        let uid = ctx.session.id
        await user.findOne({
            where: { id: uid }
        }).then(res => {
            if (res.power !== 0) {
                return next()

            } else {
                ctx.body = result(-5, '权限不足')
            }
        })
    }); 
    app.use(labUser.routes(), labUser.allowedMethods())
       
    //实验室老师权限
    app.use(async (ctx, next) => {
        let uid = ctx.session.id
        console.log(uid)
        await user.findOne({
            where: { id: uid }
        }).then(res => {
            console.log(res.power)
            if (res.power !== 1) {
             
                return next()
            } else {
                ctx.body = result(-5, '权限不足')
                console.log(res.power !== 1)
            }
        })
    });
    app.use(labTeacher.routes(), labTeacher.allowedMethods())
    //root用户权限
    app.use(async (ctx, next) => {
        let uid = ctx.session.id
        await user.findOne({
            where: { id: uid }
        }).then(res => {
            if (res.power !== 2) {
                return next()
            } else {
                ctx.body = result(-5, '权限不足')
            }
        })
    });
    app.use(root.routes(), root.allowedMethods())
}