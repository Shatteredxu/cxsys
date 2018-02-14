var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')
/**
 * 人员进出表
 */
var record = sequelize.define('record', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true ,autoIncrement:true},
    uid: { type: Sequelize.INTEGER(10) },
    record: { type: Sequelize.INTEGER(1) },
    time: { type: Sequelize.DATE(), defaultValue: Sequelize.NOW() },
    content: { type: Sequelize.CHAR(255) },
    labId:{type: Sequelize.INTEGER(10)},
},
    {
        tableName: 'db_record',
        timestamps: false
    })
module.exports = record 