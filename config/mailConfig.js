'use strict';
var mail = require('nodemailer')
var result = require('../result/result')
module.exports = {
    /**
     * 邮箱配置
     * @param {object} ctx 
     * @param {string} toEmail 需要注册的邮箱
     * @param {string} title 发送的标题
     * @param {string} content 发送的内容
     * @param {string} result 发送结果
     */
    async mailSend(ctx, toEmail, title, content) {
        var transorter = mail.createTransport({
            service: 'qq',
            secureConnection: true,
            secure: true,
            port: 465,
            auth: {
                user: '396256980@qq.com',
                pass: 'gkyitydqmsfxcabb'
            }
        })
        var mailoptions = {
            from: '396256980@qq.com',
            to: toEmail,
            subject: title,
            html: content
        }
        let message = await transorter.sendMail(mailoptions)
        return message
    }
}