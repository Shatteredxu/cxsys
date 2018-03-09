

'use strict';
var result = require('../result/result')
var project = require('../modles/project')
var user = require('../modles/user')
var lab = require('../modles/lab')
var notice = require('../modles/notice')
var crypto = require('../config/cryptoConfig')
var token1 = require('../config/jsonWebToken')
var common = require('../common/common')
var lab_glory = require("../modles/lab_glory")
var notice = require('../modles/notice')
var goods = require('../modles/goods')
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
            ctx.body = result(0, Error)
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
            include: { model: user, attributes: ['id', 'sid', 'name', 'headImg', 'email', 'power'] }
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(error => {
            ctx.body = result(0, error)
        })
    },
    /**
     * 查询头像
     * @param {*} ctx 
     */
    async QueryIMG(ctx) {
        let param = ctx.request.body.param
        await user.findOne(
            {
                attributes: ['id', 'sid', 'name', 'headImg', 'email', 'power'],
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
        user.belongsTo(lab, { foreignKey: 'own_lab' })
        await user.findAndCountAll({
            'limit': pageCount,
            'offset': pageCount * (currentPage - 1),
            where: { power: 2 },
            attributes: ['id', 'sid', 'name', 'headImg', 'email', 'power', 'own_lab', 'introduce', 'rank'],
            include: { model: lab }
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(err => {
            ctx.body = result(0, err)
        })
    },
    //查询公告
    async queryNotice(ctx) {
        let len = ctx.request.body.len
        if (len) {
            await notice.findAll({
                'order': [
                    ['id', 'DESC'],
                ],
                limit: len
            }).then(res => {
                ctx.body = result(1, res)
            }).catch(err => {
                ctx.body = result(0, err)
            })
        } else {
            await notice.findAll({
                'order': [
                    ['id', 'DESC'],
                ],
            }).then(res => {
                ctx.body = result(1, res)
            }).catch(err => {
                ctx.body = result(0, err)
            })
        }
    },
    /**
     * 根据实验室获取老师
     * @param {*} ctx 
     */
    async getTeacherBylabId(ctx) {
        let s = ctx.request.body
        let pageCount = parseInt(s.pageCount)
        let currentPage = parseInt(s.currentPage)
        let labId = s.labId
        lab.belongsTo(user, { foreignKey: 'chargeUser' })
        await user.findAndCountAll({
            'limit': pageCount,
            'offset': pageCount * (currentPage - 1),
            where: { power: 2, own_lab: labId },
            attributes: ['id', 'sid', 'name', 'headImg', 'email', 'power', 'own_lab', 'introduce']
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(error => {
            ctx.body = result(0, error)
        })
    },
    //获取实验室荣誉
    async queryGlory(ctx) {
        let s = ctx.request.body
        let labId = s.labId
        lab_glory.belongsTo(lab, { foreignKey: 'ownLab' })
        if (labId) {
            await lab_glory.findAndCountAll({
                attributes: ["id", "winTime", "ownPro"],
                where: { ownLab: labId },
                include: { model: lab }
            }).then(res => {
                ctx.body = result(1, res)
            })
        } else {
            await lab_glory.findAndCountAll({
                attributes: ["id", "winTime", "ownPro"],
                include: { model: lab }
            }).then(res => {
                ctx.body = result(1, res)
            }).catch(err => {
                ctx.body = result(0, err)
            })
        }
    },
    //获取实验室信息
    async getLabById(ctx) {
        let labId = ctx.request.body.labId
        if (labId) {
            var count = await user.count({
                where: { power: 2, own_lab: labId },
            })
            await lab.findOne({
                where: { id: labId }
            }).then((res) => {
                ctx.body = result(count, res)
            })
        } else {
            ctx.body = result(-1, '参数错误')
        }
    },
    async getGoodsById(ctx) {
        goods.belongsTo(lab, { foreignKey: 'belongTo' })
        let id = ctx.request.body.id
        await goods.findOne({
            where: { id: id },
            include: { model: lab }
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(err => {
            ctx.body = result(0, err)
        })
    },
    async getAllResult(ctx) {
        let type = ctx.request.body.type
        let labId = ctx.request.body.labId
        await lab_glory.findAndCount({
            where: { type: type, }
        }).then(res => {
            ctx.body = result(1, res)
        }).catch(err => {
            ctx.body = result(0, err)
        })
    },
    async getProByLabId(){

    }
} 