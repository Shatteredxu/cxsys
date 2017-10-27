var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')
/**
 * 项目表
 */
var projectUser = sequelize.define('projectUser', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true },
    pid: { type: Sequelize.INTEGER(10) },
    uid: { type: Sequelize.INTEGER(10) }
},
    {
        tableName: 'project_user',
        timestamps: false
    })
module.exports = projectUser 