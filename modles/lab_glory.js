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
    name:{ type: Sequelize.CHAR(20)},
    winUser:{ type: Sequelize.CHAR(20)},
    result:{ type: Sequelize.CHAR(50)},
    guideTea:{ type: Sequelize.CHAR(30)},
    level:{ type: Sequelize.INTEGER(1)},
    type:{type: Sequelize.INTEGER(1)},
    winTime: { type: Sequelize.DATE(20),defaultValue: Sequelize.NOW()},
    ownLab: { type: Sequelize.INTEGER(10) },
    author:{type:Sequelize.CHAR(10)},
}, {
        tableName: 'lab_glory',
        timestamps: false
    })
module.exports = lab_glory