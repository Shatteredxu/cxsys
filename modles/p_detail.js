var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 项目详情表
 */
var p_detail = sequelize.define('p_detail', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true,autoIncrement:true },
    describe:{ type: Sequelize.STRING(255) },
    issuer: { type: Sequelize.INTEGER(10) },
    datetime: { type: Sequelize.datetime()  ,defaultValue:Sequelize.NOW()},
    ownpro: { type: Sequelize.INTEGER(10) },
},
    {
        tableName: 'p_detail',
        timestamps: false
    })
module.exports = p_detail