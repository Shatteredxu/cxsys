var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')
/**
 * 实验室荣誉表
 */
var lab_glory = sequelize.define('lab_glory', {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        allowNull: false
    },
    winTime: { type: Sequelize.DATE(20),defaultValue: Sequelize.NOW()},
    ownLab: { type: Sequelize.INTEGER(10) },
    ownPro:{type:Sequelize.INTEGER(10)},
    prize: { type: Sequelize.TEXT(255)},
}, {
        tableName: 'lab_glory',
        timestamps: false
    })
module.exports = lab_glory