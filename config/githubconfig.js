'use strict';
/**
 *  用于用户github登陆的数据
 * @param database: 需要连接的数据库
 * @param client_id: github上获取的参数
 * @param client_secret: github上获取的参数
 * @param scope :需要从github上获取的数据
 */

module.exports = {
    'database': 'mysql://localhost:3306/database',
    'client_id': 'a66dbf35bae39089af17',
    'client_secret': 'bc4d8cfb5504c21e1488c3c5b50512ea94a1972d',
    'scope': ['user'],
};
