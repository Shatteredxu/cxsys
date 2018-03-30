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
 * 
 * 
 */
module.exports = {
  /**
   * 修改实验室老师
   * @param {*} ctx 
   */
   async editLabTea(ctx){
     let sid = ctx.request.body.sid
     var name = ctx.request.body.name
     let labId = ctx.request.body.labId
     var exist=0
     var nid=0
    await user.findOne({
      where:{sid:sid}
    }).then(res=>{
      console.log(res.name ==name)
      res.name == name ? exist = 1 : exist = 0
      nid=res.id
    }).catch(err=>{
      ctx.body = result(0,'服务器错误')
    })
    if(exist==1){
      await lab.update({
        chargeUser:nid
      },{
        where:{id:labId}
      }).then(res=>{
        ctx.body = result(1,res)
      }).catch(err=>{
        ctx.body = result(0,err)
      })
     }else{
       ctx.body = result(-2,'用户不存在')
     }
    },
    async getRoot(ctx){
      await user.findAll({
        'attributes': ['id', 'name', 'headImg', 'power', 'email', 'sex', 'phone', 'sid', 'introduce'],
      }).then(res=>{
        ctx.body = result(1,res)
      }).catch(err=>{
        ctx.body = result(0,err)
      })
    },
    async addLab(ctx){
      let s = ctx.request.body
      let name = s.name
      let position = s.position
      let isOpen = s.isOpen
      let tname = s.tname
      let tid = s.tid
      let exist = 0
      await user.findOne({
        where:{sid:tid}
      }).then(res=>{
        res?exist=res.id:exist=0
        console.log(res.id)
      }).catch(err=>{
        ctx.body = result(0,err)
      })
      if(exist){
        await lab.create({
          name:name,
          position:position,
          isOpen:isOpen,
          chargeUser:exist,
        }).then(res=>{
          ctx.body = result(1,res)
        }).catch(err=>{
          ctx.body = result(0,err)
        })
      }else{
        ctx.body = result(-2,'用户不存在')
      }
    },
    async deleteLab(ctx){
      let id = ctx.request.body.id
      await lab.destroy({
        where:{id:id}
      }).then(res=>{
        ctx.body = result(1,res)
      }).catch(err=>{
        ctx.body = result(0,err)
      })
    }
}