var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 实验室物品表
 */
var goods = sequelize.define('goods', {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
    },
    name: { type: Sequelize.CHAR(25) },
    price: { type: Sequelize.INTEGER(10) },
    model:{type:Sequelize.CHAR(20)},
    buyTime: { type: Sequelize.DATE(), defaultValue: Sequelize.NOW() },
    belongTo: {type: Sequelize.INTEGER(10)},
    stateId: { type: Sequelize.INTEGER(10) },
    validTime: { type: Sequelize.DATE() }
}, {
        tableName: 'db_goods',
        timestamps: false
    })
module.exports = goods