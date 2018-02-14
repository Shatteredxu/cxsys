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
var path = require('path')
const uuidV1 = require('uuid/v1')
var fs = require('fs')
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
  },
  //修改实验室基本信息
  async updateLabInfo(ctx){
    let s = ctx.request.body
    let name = s.name
    let position = s.position
    let establishTime = s.establishTime
    let isOpen = s.isOpen
    let introduction = s.introduction
    await lab.update({
      name:name,
      position:position,
      establishTime:establishTime,
      isOpen:isOpen,
      introduction:introduction
    }).then(res=>{
      ctx.body = result(1,res)
    }).catch(err=>{
      ctx.body = result(0,err)
    })
  },
  //上传实验室图片
  async updateLabImg(ctx){
    console.log("sds")
    const filePaths = [];
    var res;
    const files = ctx.request.body.files || {};
    const labId = ctx.request.body.fields.labId
    console.log(labId)
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
            let databasePath = `/${UUidName}`
            if(labId){
              await lab.update({
                photo: databasePath
            },
                {
                  where: { id: labId }
                }).then((res) => {
                    ctx.body = result(1, "")
                }).catch(Error => {
                    ctx.body = result(0, Error)
                })
            }
        } else {
            ctx.body = result(-2, '格式不正确')
        }
    }
  }

}