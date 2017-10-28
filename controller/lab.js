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
    console.log(pageCount,currentPage)
    if (lid) {
      await goods.findAndCountAll({
        'limit': pageCount,
        'offset': pageCount * (currentPage - 1)
      },{where:{id:lid}}).then(res =>{
        ctx.body = result(1,res)
      }).catch(Error=>{
        ctx.body = result(0,"服务器错误")
      })
    } else {
      ctx.body = result(-3, '参数错误')
    }
  }
}