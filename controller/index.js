

'use strict';
var result = require('../result/result')
var project = require('../modles/project')
var user = require('../modles/user')
var lab = require('../modles/lab')
var notice = require('../modles/notice')
var crypto = require('../config/cryptoConfig')
var token1 = require('../config/jsonWebToken')
var common = require('../common/common')
/**
 * 获取项目列表（分页）
 * 分页获取实验室
 * 登陆用户
 * 获取项目列表（分页）
 * 
 */
module.exports = {

    /**
     *  
     * 注册用户
     * @param {object} ctx 请求 
     */
    async getProject(ctx) {
        let s1 = ctx.request.header
        let s = ctx.request.body
        let pageCount = parseInt(s.pageCount)
        let currentPage = parseInt(s.currentPage)
        console.log(pageCount, currentPage)
        project.belongsTo(user, { foreignKey: 'chargeUser' })
        project.belongsTo(lab, { foreignKey: 'labId' })
        await project.findAndCountAll({
            'limit': pageCount,
            'offset': pageCount * (currentPage - 1),
            include: [{ model: user, attributes: ['id', 'sid', 'name', 'headImg', 'email', 'pid', 'power'] },
            { model: lab }]
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(Error => {
            ctx.body = result(0, '服务器错误')
        })
    },
    /**
     * 分页获取实验室
     * @param {*} ctx 
     */
    async getLab(ctx) {
        let s = ctx.request.body
        let pageCount = parseInt(s.pageCount)
        let currentPage = parseInt(s.currentPage)
        lab.belongsTo(user, { foreignKey: 'chargeUser' })
        await lab.findAndCountAll({
            'limit': pageCount,
            'offset': pageCount * (currentPage - 1),
            include: { model: user, attributes: ['id', 'sid', 'name', 'headImg', 'email', 'pid', 'power'] }
        }).then(res => {
            ctx.body = result(1, res)
        })
    },
    // 登陆用户
    async login(ctx) {
        var s = ctx.request.body
        let login = s.param
        let password = s.password
        let md5pass = crypto.getMd5(password)
        await user.findOne({ where: { $or: [{ name: login }, { phone: login }, { email: login }] } })
            .then(async res => {
                if (res == null) {
                    ctx.body = result(-1, '用户名不存在')
                } else if (res.password == md5pass) {
                    var token = await common.saveToken(res.id)
                    ctx.body = result(1, token)
                    ctx.session.id = res.id
                } else if (res.password !== md5pass) {
                    ctx.body = result(-2, '密码错误')
                } else {
                    ctx.body = result(0, '服务器错误')
                }
                console.log(ctx.session.user)
            }).catch(Error => {
                ctx.body = result(0, '服务器错误')
            })
    },
    //注册用户
    async register(ctx) {
        var s = ctx.request.body
        let name = s.name
        let password = s.password
        let email = s.email
        let md5pass = crypto.getMd5(password)
        let existUname = await user.findOne({ where: { name: name } })
        let existEmail = await user.findOne({ where: { email: email } })
        if (existUname == null && existEmail == null) {
            await user.create({
                name: name,
                password: md5pass,
                email: email,
            }).then(res => {
                ctx.body = result(1, '注册成功')
            })
        } else if (existUname !== null) {
            ctx.body = result(-1, '昵称被占用')
        } else if (existEmail !== null) {
            ctx.body = result(-2, '邮箱被注册')
        } else {
            ctx.body = result(0, '服务器错误')
        }
    },
    async getAllProject(ctx) {
        let s1 = ctx.request.header
        let s = ctx.request.body
        project.belongsTo(user, { foreignKey: 'chargeUser' })
        project.belongsTo(lab, { foreignKey: 'labId' })
        await project.findAll({
            include: [{ model: user, attributes: ['id', 'sid', 'name', 'headImg', 'email', 'pid', 'power'] },
            { model: lab }]
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(Error => {
            ctx.body = result(0, '服务器错误')
        })
    },
    async getAllLab(ctx) {
        let s = ctx.request.body
        lab.belongsTo(user, { foreignKey: 'chargeUser' })
        await lab.findAll({
            include: { model: user, attributes: ['id', 'sid', 'name', 'headImg', 'email', 'pid', 'power'] }
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(error => {
            ctx.body = result(0, error)
        })
    },
    async QueryIMG(ctx) {
        let param = ctx.request.body.param
        await user.findOne(
            {
                attributes: ['id', 'sid', 'name', 'headImg', 'email', 'pid', 'power'],
                where: { $or: [{ name: param }, { email: param }] }
            },
        ).then(res => {
            ctx.body = result(1, res)
        }).catch(err => {
            ctx.body = result(0, err)
        })
    },
    //分页获取老师
    async getTeacher(ctx) {
        let s = ctx.request.body
        let pageCount = parseInt(s.pageCount)
        let currentPage = parseInt(s.currentPage)
        lab.belongsTo(user, { foreignKey: 'chargeUser' })
        await user.findAll({
            'limit': pageCount,
            'offset': pageCount * (currentPage - 1),
            where: { power: 2 },
            attributes: ['id', 'sid', 'name', 'headImg', 'email', 'power', 'own_lab', 'introduce']
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(err => {
            ctx.body = result(0, err)
        })
    },
    async queryNotice(ctx){
        let len = ctx.request.body.len
        await notice.findAll({
            'order': [
                ['id', 'DESC'],
            ],
            limit: len
        }).then(res=>{
            ctx.body = result(1,res)
        }).catch(err=>{
            ctx.body = result(0,err)
        })
    },
    
}