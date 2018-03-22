## cxsys（koa+mysql+react+sequelize）
创新实验室管理系统 （2017年1月-2018年四月）
#### 各文件夹的作用
——————.vscode vscode的debug工具配置
——————common 接口的一些工具类 比如生成随机生成六位数的验证码
——————config 数据库，uuid，发送邮件等配置文件
——————controller 后台接口的具体逻辑实现 
——————————index.js 未登录用户请求-
——————————user.js 普用户请求 
——————————lab.js 实验室用户请求
——————————labt：实验室老师请求
——————————root：root用户权限
——————model 数据库映射模型
——————public 公共资源目录（存放文件，数据）
——————result 存放结果集
——————route 分发请求目录
————————index.js 未登录用户路由
————————user.js 普用户路由
————————lab.js 实验室用户路由
————————labt：实验室老师路由
————————root：root用户路由
——————views 视图层（前后端分离 前端react 暂时没写）
——————app.js 入口文件
——————router.js 将请求分发至对应的文件 实现权限认证

clone到本地 cnpm start 或者 node app.js 可启动服务器
