var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')
/**
 * 项目表申请表
 */
var projectApply = sequelize.define('projectApply', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true },
    pid: { type: Sequelize.INTEGER(10) },
    applyTime: { type: Sequelize.INTEGER(1),defaultValue: Sequelize.NOW() },
    applyLab: { type: Sequelize.INTEGER(10) },
    scheme: { type: Sequelize.CHAR(50) },
    devDemand:{type: Sequelize.CHAR(255)},
},
    {
        tableName: 'project_apply',
        timestamps: false
    })
module.exports = projectApply 