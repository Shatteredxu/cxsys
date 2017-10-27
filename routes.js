const index = require('./routes/index')
const users = require('./routes/users')

module.exports.initialize = function (app) {
    /**
     * 定义路由，分发请求
     */
    // 用户不需要登录的请求
    app.use(index.routes(), index.allowedMethods())
    // 判断用户是否登录
    app.use((ctx, next) => {
        if (ctx.session.id ) {
            return next();
        } else {
            // ctx.redirect('/login');// 未登录则跳转到登陆界面
            ctx.session.id = 1
            return next();
        }
    });
    // 普通用户请求 
    app.use(users.routes(), users.allowedMethods())
    // 管理员请求
}