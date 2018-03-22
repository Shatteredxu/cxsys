
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
var path = require('path')
var fs = require('fs')
const uuidV1 = require('uuid/v1')
var ejsExcel = require('ejsexcel');
var  xlsx =require('node-xlsx') ;
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
      record:rec,
      content:content,
      labId:labId,
      uid:uid
    }).then(res=>{
      ctx.body = result(1,res)
    }).catch(err=>{
      ctx.body = result(0,err)
    })
  },
  /**
   * 删除物品
   */
  async DeleteGoods(ctx){
    let id =ctx.request.body.id
    await goods.destroy({
      where:{id:id}
    }).then(re=>{
      ctx.body =result(1,re)
    }).catch(err=>{
      ctx.body = result(0,err)
    })
  },
  /**
   * 修改实验室物品
   * @param {*} ctx 
   */
  async AlterGoods(ctx){
    let s = ctx.request.body
    let name = s.name
    let price = s.price
    let models = s.models
    let buyTime = s.buyTime
    let labId = s.labId
    let stateId = s.stateId
    let validTime = s.validTime
    let detailInfo = s.detailInfo
    let id = s.id
    await goods.update({
        name:name,
        price:price,
        models:models,
        buyTime:buyTime,
        belongTo:labId,
        stateId:stateId,
        validTime:validTime,
        detailInfo:detailInfo
    },{where:{id:id}}).then(res=>{
      ctx.body = result(1,res)
    }).catch(err=>{
      ctx.body = result(0,err)
    })
  },
  async addLabGoods(ctx){
    let s = ctx.request.body
    let name = s.name
    let price = s.price
    let models = s.models
    let buyTime = s.buyTime
    let labId = s.labId
    let stateId = s.stateId
    let validTime = s.validTime
    let detailInfo = s.detailInfo
      await goods.create({
        name:name,
        price:price,
        models:models,
        buyTime:buyTime,
        belongTo:labId,
        stateId:stateId,
        validTime:validTime,
        detailInfo:detailInfo
      }).then(res=>{
        ctx.body = result(1,res)
      }).catch(err=>{
        ctx.body=result(0,err)
      })
  },
  async addGoodsImage(ctx){
    const filePaths = [];
    var res;
    let s = ctx.request.body.fields
    const files = ctx.request.body.files || {};
    let  id = s.id
    console.log(id)
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
        if (id) {
          await goods.update({
            photo: databasePath,
          },
            {
              where: { id: id }
            }).then((res) => {
              ctx.body = result(1, "")
            }).catch(Error => {
              ctx.body = result(0, Error)
            })
        }else{
          ctx.body = result(-5,'参数不正确') 
        }
      } else {
        ctx.body = result(-2, '格式不正确')
      }
    }
  },
  async exportGoods1(ctx){
    var exlBuf = fs.readFileSync("./test.xlsx");
    var data = [[{"dpt_des":"开发部","doc_dt":"2013-09-09","doc":"a001"}],[{"pt":"pt1","des":"des1","due_dt":"2013-08-07","des2":"2013-12-07"},{"pt":"pt1","des":"des1","due_dt":"2013-09-14","des2":"des21"}]];
    ejsExcel.renderExcel(exlBuf, data).then(function(exlBuf2) {
      fs.writeFileSync("./test.xlsx", exlBuf2);
      console.log("生成test2.xlsx");
    }).catch(function(err) {
      console.error(err);
    });
  },
  //导出物品表格
  async exportGoods(ctx){
    let labId = ctx.request.body.labId
    var s = fs.createWriteStream(`./public/word/${uuidV1()}.xlsx`, function (err, data) {
      if (err) {
          return console.error(err);
      }
   });
   var fileName = s.path
    var data1 = []
    await goods.findAll({
      where:{belongTo:labId}
    }).then(res=>{
      data1=res
    })
    data1.forEach((ele,i) => {
      console.log(ele.stateId)
      let state =ele.stateId==0?"空闲":ele.stateId==1?"外借":"占用"
      data1[i]=[i+1,ele.name,ele.price,ele.models,ele.buyTime,ele.validTime,state]
    });
    data1.unshift(["序号","物品名","价格","型号","购买时间","有效时间","状态"])
    var buffer = xlsx.build([{name: "mySheetName", data: data1}]); 
    fs.writeFileSync(fileName, buffer, 'binary')
    ctx.body = result(1,fileName)
  },
  //删除物品表格
  async deleteSheet(ctx){
    let fileName = ctx.request.body.fileName
    await fs.unlink(`./public/word/${fileName}`,function(err){
      ctx.body = result(0,'服务器错误')
    })
    ctx.body = result(1,'删除成功')
  },
   //导出人员进出表
   async exportRecord(ctx){
    let labId = ctx.request.body.labId
    var s = fs.createWriteStream(`./public/word/${uuidV1()}.xlsx`, function (err, data) {
      if (err) {
          return console.error(err);
      }
   });
   var fileName = s.path
    var data1 = []
    record.belongsTo(user,{foreignKey:'uid'})
    await record.findAll({
      where:{labId:labId},
      include:{model:user,attributes:["id","name"]}
    }).then(res=>{
      data1=res
    })
    ctx.body = data1
    data1.forEach((ele,i) => {
      let record = ele.record==0?'进':'出'
      data1[i]=[i+1,ele.user.name,record,ele.time,content]
    });
    data1.unshift(["序号","姓名","进出","时间","备注"])
    var buffer = xlsx.build([{name: "mySheetName", data: data1}]); 
    fs.writeFileSync(fileName, buffer, 'binary')
    ctx.body = result(1,fileName)
  },
}