'use strict';
var result = require('../result/result')
var project = require('../modles/project')
var user = require('../modles/user')
var lab = require('../modles/lab')
var crypto = require('../config/cryptoConfig')
var token1 = require('../config/jsonWebToken')
var common = require('../common/common')
var goods = require('../modles/goods')
var goodState = require('../modles/goodState')
var record = require('../modles/record')
/**
 * 1.获取实验室物品
 * 
 */
module.exports = {
  /**
   * 获取实验室物品
   */
  async getLabGoods(ctx) {
    let s = ctx.request.body
    let lid = s.id
    let pageCount = parseInt(s.pageCount)
    let currentPage = parseInt(s.currentPage)
    goods.belongsTo(lab,{foreignKey:'belongTo'})
    if (lid) {
      await goods.findAndCountAll({
        'limit': pageCount,
        'offset': pageCount * (currentPage - 1)
      },{where:{id:lid},include:{ model: lab}}).then(res =>{
        ctx.body = result(1,res)
      }).catch(Error=>{
        ctx.body = result(0,"服务器错误")
      })
    } else {
      await goods.findAndCountAll({
        'limit': pageCount,
        'offset': pageCount * (currentPage - 1)
     ,include:{ model: lab} }).then(res =>{
        ctx.body = result(1,res)
      }).catch(Error=>{
        ctx.body = result(0,"服务器错误")
      })
    }
  },
  /**
   * 人员进出记录登记
   * @param {*} ctx 
   */
  async StaffRecord(ctx){
    let s = ctx.request.body 
    let rec = s.rec
    let content = s.content
    let labId = s.labId
    let uid = ctx.session.id
    await record.create({
      rec:rec,
      content:content,
      labId:labId,
      uid:uid
    }).then(res=>{
      ctx.body = result(1,res)
    }).catch(err=>{
      ctx.body = result(0,err)
    })
  }
}