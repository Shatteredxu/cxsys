var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 实验室表
 */
var lab = sequelize.define('lab', {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    chargeUser:{type:Sequelize.INTEGER(10)},
    name: { type: Sequelize.CHAR(20) },
    position: { type: Sequelize.CHAR(30) },
    establishTime: { type: Sequelize.DATE() ,defaultValue:Sequelize.NOW()},
    isOpen: { type: Sequelize.INTEGER(1) ,defaultValue:0},
    introduction: { type: Sequelize.CHAR(255) },
    photo: { type: Sequelize.TEXT() },
    institute:{type:Sequelize.CHAR(50)}
}, {
        tableName: 'db_lab',
        timestamps: false
    })
module.exports = lab