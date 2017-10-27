var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 公告表
 */
var notice = sequelize.define('notice', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true,autoIncrement:true },
    issueId: { type: Sequelize.INTEGER(10) },
    time: { type: Sequelize.timestamps(6) ,defaultValue:Sequelize.NOW()},
    title: { type: Sequelize.CHAR(30) },
    content: { type: Sequelize.CHAR(255) },
    sendType: { type: Sequelize.INTEGER(1),defaultValue:0 },
    sendUser:{type:Sequelize.INTEGER(10)}
},
    {
        tableName: 'db_notice',
        timestamps: false
    })
module.exports = notice