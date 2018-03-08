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
var lab_glory = require("../modles/lab_glory")
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
    console.log(pageCount, currentPage)
    if (lid) {
      await goods.findAndCountAll({
        'limit': pageCount,
        'offset': pageCount * (currentPage - 1)
      }, { where: { id: lid } }).then(res => {
        ctx.body = result(1, res)
      }).catch(Error => {
        ctx.body = result(0, "服务器错误")
      })
    } else {
      ctx.body = result(-3, '参数错误')
    }
  },

  //上传实验室图片
  async updateLabInfo(ctx) {
    const filePaths = [];
    var res;
    let s = ctx.request.body.fields
    const files = ctx.request.body.files || {};
    let  labId = s.labId
    let name = s.name
    let position = s.position
    let establishTime = s.establishTime
    let isOpen = s.isOpen
    let introduction = s.introduction
    let institute = s.institute
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
        if (labId) {
          await lab.update({
            photo: databasePath,
            name: name,
            position: position,
            establishTime: establishTime,
            isOpen: isOpen,
            introduction: introduction,
            institute: institute
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
  },
  async addLabStu(ctx) {
    let s = ctx.request.body
    let name = s.name
    let sid = s.sid
    let uid = ctx.session.id
    let labId = ctx.request.body.labId
    var exist = 0
    await user.findOne({
      where: { sid: sid }
    }).then(res => {
      console.log(res.name)
      res.name == name ? exist = 1 : exist = 0
    }).catch(err => {
      ctx.body = result(0, '服务器错误')
    })
    if (exist == 1) {
      await user.update({
        own_lab: labId
      }, {
          where: { sid: sid }
        }).then(res => {
          ctx.body = result(1, '添加成功')
        }).catch(err => {
          ctx.body = result(0, '服务器错误')
        })
    } else {
      ctx.body = result(-2, '该用户不存在')
    }
  },
  //删除实验室用户
  async deleteUser(ctx){
    let id = ctx.request.body.id
    await user.update({
      own_lab:''
    },{where:{
      id:id
    }}).then(res=>{
      ctx.body = result(1,'删除成功')
    }).catch(err=>{
      ctx.body = result(0,'服务器错误')
    })
  },
  //获取实验室成员
  async getLabUser(ctx){
    var uid =ctx.session.id
    var labId=ctx.request.body.labId
    await user.findAndCount({
      where:{own_lab:labId,power:2},
      attributes: ['id', 'sid', 'name', 'headImg', 'email', 'power'],
    }).then(res=>{
      ctx.body = result(1,res)
    }).catch(err=>{
      ctx.body = result(0,'服务器错误')
    })
  },
  async editLabInfo(ctx){
    
  },
  //获取实验室所有的项目
  async getLabPro(ctx){
  let s = ctx.request.body
  let pageCount = parseInt(s.pageCount)
  let currentPage = parseInt(s.currentPage)
  let id = s.labId
  await lab.findAndCountAll({
    'limit': pageCount,
     'offset': pageCount * (currentPage - 1),
  },{where:{id:id}}).then(res=>{
    ctx.body = result(1,res)
  }).catch(err=>{
    ctx.body = result(0,err)
  })
  },
  //删除项目
  async deletePro(ctx){
    let id = ctx.request.body.id
    await  project.destroy({
      where:{id:id}
    }).then(res=>{
      ctx.body = result(1,res)
    }).catch(err=>{
      ctx.body = result(0,err)
    })
  },
  //添加实验室荣誉
  async addLabGlory(ctx){
    let s = ctx.request.body
    let type = s.type
    let name = s.name
    let level = s.level 
    let winUser =s.winUser
    let author = s.author
    let guideTea = s.guideTea
    let gloryInfo = s.gloryInfo
    let labId = s.labId
    let winTime = s.winTime
    if(type==0){
      await lab_glory.create({
        name:name,
        level:level,
        winUser:winUser,
        guideTea:guideTea,
        ownLab:labId,
        winTime:winTime
      }).then(res=>{
        ctx.body = result(1,res)
      }).catch(err=>{
        ctx.body = result(0,err)
      })
    }else{
      await lab_glory.create({
        name:name,
        author:author,
        ownLab:labId,
        winTime:winTime
      }).then(res=>{
        ctx.body = result(1,res)
      }).catch(err=>{
        ct.body = result(0,err)
      })
    }
  }
}