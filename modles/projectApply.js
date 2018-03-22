var Sequelize = require('sequelize')
var sequelize = require('../config/sqlconfig')
/**
 * 项目表申请表
 */
var projectApply = sequelize.define('projectApply', {
    id: { type: Sequelize.INTEGER(10), primaryKey: true ,autoIncrement:true},
    uid:{type: Sequelize.INTEGER(10), },
    pname: { type: Sequelize.CHAR(50) },
    uname: { type: Sequelize.CHAR(50) },
    guideName: { type: Sequelize.CHAR(50) },
    applyTime: { type: Sequelize.DATE,defaultValue: Sequelize.NOW() },
    applyLab: { type: Sequelize.INTEGER(10) },
    scheme: { type: Sequelize.CHAR(50) },
    devDemand:{type: Sequelize.CHAR(255)},
    applyType:{type:Sequelize.CHAR(1)},
    contactWay:{type:Sequelize.CHAR(20)},
    expertTime:{type:Sequelize.DATE}
},
    {
        tableName: 'project_apply',
        timestamps: false
    })
module.exports = projectApply 