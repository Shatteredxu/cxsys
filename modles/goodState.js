var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 物品状态表
 */
var goodState = sequelize.define('goodState', {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        allowNull: false
    },
    borrowTime: { type: Sequelize.DATE(10) },
    actualTime: { type: Sequelize.DATE(10) },
    isDamage: { type: Sequelize.INTEGER(1) }
}, {
        tableName: 'db_goodState',
        timestamps: false
    })
module.exports = goodState