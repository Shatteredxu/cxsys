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
		await user.update({
			token: token
		}, {
				where: { id: id }
			}).then(res => {
				return token
			})
	},
	getIdentifyCode(){
		var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        var randomNum = ''
        for (var i = 0; i < 6; i++) {
            let str = chars[Math.floor(Math.random() * 36)]
            randomNum += str
        }
        return randomNum
	}
}