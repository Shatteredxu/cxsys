var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')
/**
 * 项目表
 */
var user = sequelize.define('user', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true },
    sid: { type: Sequelize.INTEGER(10),defaultValue:0 },
    name: { type: Sequelize.CHAR(10) },
    password: { type: Sequelize.CHAR(30) },
    headImg: { type: Sequelize.CHAR(50),defaultValue:'/images/header.jpg' },
    email:{type: Sequelize.CHAR(15)},
    pid:{type: Sequelize.INTEGER(10)},
    phone:{type: Sequelize.CHAR(11),defaultValue:'无'},
    sex:{type: Sequelize.INTEGER(1),defaultValue:0},
    power:{type: Sequelize.INTEGER(1),defaultValue:0},
    token:{type:Sequelize.CHAR(255)},
    own_lab:{type:Sequelize.CHAR(10)}
},
    {
        tableName: 'db_user',
        timestamps: false
    })
module.exports = user 