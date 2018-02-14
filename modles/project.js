var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 项目表
 */
var project = sequelize.define('project', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true,autoIncrement:true },
    name: { type: Sequelize.CHAR(30) },
    chargeUser: { type: Sequelize.INTEGER(10) },
    chargeTeacher:{type:Sequelize.INTEGER(10)},
    startTime: { type: Sequelize.DATE(10), defaultValue: Sequelize.NOW() },
    applyTime: { type: Sequelize.DATE(10) },
    expectTime: { type: Sequelize.DATE(10) },
    actualTime: { type: Sequelize.DATE(10) },
    labId: { type: Sequelize.INTEGER(10) },
    resultsText:{type: Sequelize.CHAR(50)},
    projectResults:{type: Sequelize.CHAR(255)},
},
    {
        tableName: 'db_project',
        timestamps: false
    })
module.exports = project