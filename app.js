const Koa = require('koa');
/**
 * Koa 导入的是一个类
 */
const app = new Koa();
/**
 * 模板引擎
 */
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
/**
 * middlewares 用来处理post请求
 */
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
/**
 * 管理nodeJs访问日志、系统日志
 */
const { accessLogger, systemLogger } = require('./utils/log4');
// 捕获全局状态下的error
app.on('error', err => {
  systemLogger.error(err);
});
app.use(accessLogger());

const chalk = require('chalk');

/**
 * 接入模板引擎koa-nunjucks-2
 */
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
// const templating = require('./server/middlewares/tempalting');
const config = require('./config/index');

const index = require('./routes/index');
const users = require('./routes/users');
const modules = require('./routes/module');

// error handler
onerror(app);
app.use(json());

/**
 * middlewares 用来处理post请求
 */
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

/**
 * Development style logger middleware for koa
 * <-- GET /
 * --> GET / 200 835ms 746b
 */
app.use(logger());

/**
 * koa-static中间件，统一处理静态资源文件
 */
app.use(require('koa-static')(__dirname + '/public'));

/**
 * views中间件属于模板引擎
 */
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }));
// app.use(templating('views', {
//   noCache: !config.isProduction, // 开发环境下不缓存
//   watch: !config.isProduction// 开发环境下监听
// }));
/**
 * 配置好 koa-nunjucks-2 中间件之后，它默认会在请求上下文ctx上增加 render()方法，通过调用 ctx.render('模板名', 数据) 就可以渲染页面，
 * 放在使用路由前面，否则报错：ctx.render() 不是一个 function
 */
app.use(koaNunjucks({
  ext: 'html', // 使用HTML后缀的模板
  path: path.join(__dirname, 'views'), // 模板所在路径
  nunjucksConfig: { // nunjucks的配置
    trimBlocks: true, // 开启转义，xss漏洞
    autoescape: true,
    web: {
      async: true
    },
    lstripBlocks: true,
    noCache: !config.isProduction,
    watch: true// 当模板变化时重新加载。使用前请确保已安装可选依赖 chokidar。
  }
}));

/**
 * logger
 * 每收到一个http请求，koa就会调用通过app.use()  注册  的async函数，并传入ctx和next参数
 * @param ctx 由koa传入的封装了request和response的变量，我们可以通过它访问request和response
 * @param next koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能
 */
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(modules.routes(), modules.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// debug模块
const debug = require('debug')('vue-cli-plugin-generate:server');
/**
 * 设定监听端口
 */
// app.set('port', process.env.PORT || 3000);
/**
 * 启动监听
 */
const server = app.listen('3000', function () {
  console.log('');
  console.log('');
  debug(chalk.cyan(`Express server listening on port ${server.address().port}`));
  console.log('');
  console.log('');
});

module.exports = app;
