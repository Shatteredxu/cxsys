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
    encryptToken(token) {
        jwt.verify(token, secretOrPrivateKey, function (err, decode) {
            if (err) {  //  时间失效的时候/ 伪造的token          
                rs.json({ err: err })
            } else {
                rq.decode = decode;
                console.log(decode.uid);   
                next();
            }
        })
    }
}
