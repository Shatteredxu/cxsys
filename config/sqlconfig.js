'use strict';
var Sequelize=require('sequelize')
/**
 * 建立一个sequelize连接池，链接mysql数据库
 * @param host ：端口
 * @param diaect: 连接的数据库类型
 * @return {sequelize}返回一个sequelize对象
 */
var sequelize = new Sequelize('xwj','root','root',{
    host:'localhost',
    dialect:'mysql',
    port:3306,
})
module.exports = sequelize