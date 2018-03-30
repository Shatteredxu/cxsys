var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 项目进度表
 */
var pro_rate = sequelize.define('pro_rate', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true,autoIncrement:true },
    submitter:{ type: Sequelize.INTEGER(10) },
    subTime: { type: Sequelize.DATE()  ,defaultValue:Sequelize.NOW()},
    ownpro: { type: Sequelize.INTEGER(10) },
},
    {
        tableName: 'pro_rate',
        timestamps: false
    })
module.exports = pro_rate