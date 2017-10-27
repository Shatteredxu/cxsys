'use strict';

var token1 = require("../config/jsonWebToken")
var user = require('../modles/user')
/**
 * 1.生成token
 * 2.存储token
 */
module.exports = {
	async saveToken(id) {
		var token = await token1.getToken(id)//生成token
		console.log(token)
		await user.update({
			token: token
		}, {
				where: { id: id }
			}).then(res=>{
				return token
			})
	}
}