var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 实验室物品表
 */
var goods = sequelize.define('goods', {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement:true
    },
    name: { type: Sequelize.CHAR(25) },
    photo:{type:Sequelize.CHAR(50)},
    price: { type: Sequelize.INTEGER(10) },
    models:{type:Sequelize.CHAR(20)},
    buyTime: { type: Sequelize.DATE(), defaultValue: Sequelize.NOW() },
    belongTo: {type: Sequelize.INTEGER(10)},
    stateId: { type: Sequelize.INTEGER(1),defaultValue:0},
    validTime: { type: Sequelize.DATE() },
    detailInfo:{type:Sequelize.CHAR(255)}
}, {
        tableName: 'db_goods',
        timestamps: false
    })
module.exports = goods