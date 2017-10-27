var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')

/**
 * 项目审批-成员表
 */
var approvalUser = sequelize.define('approvalUser',{
    id: {
    	type:Sequelize.INTEGER(10),
			primaryKey: true,
			autoIncrement:true,
		},
		pid: {type: Sequelize.INTEGER(10)},//审批的项目id
		uid: {type: Sequelize.INTEGER(10)},
},{
	tableName: 'approval_user',
	timestamps: false
})
	module.exports = approvalUser