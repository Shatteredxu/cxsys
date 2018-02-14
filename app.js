const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const koaBody = require('koa-body');
const cors = require('koa2-cors')
const session = require('koa-session2')
const routes = require('./routes');

// error handler
onerror(app)

// koa-body 解析请求
app.use(koaBody({ multipart: true }));

//跨域支持
app.use(cors({ credentials: true }));
// 设置session
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  // store: new Store(),
  //cookie的保存期为一天
  maxAge: 1000 * 60 * 60 * 24,
}));
//
app.use(json())

//日志中间件
app.use(logger())
// // 使用jwt
// app.use(jwt({
//   secret:'wsd'
// }).unless({path:[/^\/register/]}))
// 定义静态资源目录
app.use(require('koa-static')(__dirname + '/public'))
// 定义模板目录
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
// 打印请求日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
routes.initialize(app)

var server = app.listen(3001,()=>{
  console.log('3000 start')
})

var io = require('socket.io').listen(server)
var onlineUsers = 0
io.sockets.on('connection',(socket)=>{
  onlineUsers++
  io.sockets.emit('onlineUsers',{onlineUsers:onlineUsers})
  socket.on('disconnect',()=>{
    onlineUsers--
    io.sockets.emit('onlineUsers',{onlineUsers:onlineUsers})
  })
})