var jwt = require("jsonwebtoken"); 

/**
 * 服务器端生成token
 */
var secretOrPrivateKey = "I am a good student!" // 这是加密的key（密钥） 
module.exports = {
     getToken(uid) {
        var content = { uid: uid } // 要生成token的主题信息
         var token = jwt.sign(content, secretOrPrivateKey, {
            expiresIn: 60 * 60 * 2  // 2小时过期
        })
        // console.log("token ：" + token)
        return token
    },
    async encryptToken(token) {
        console.log("token",token)
        await jwt.verify(token, secretOrPrivateKey,await function (err, decode) {
            if (err) {  //  时间失效的时候/ 伪造的token          
                return 0
                console.log("0")  
            } else {
                rq.decode = decode;
                return decode.uid; 
                console.log("decode"+decode)  
            }
        })
    }
}
