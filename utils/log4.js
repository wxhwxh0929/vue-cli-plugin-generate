const path = require('path');
/**
 * 管理nodeJs访问日志、系统日志
 */
const koaLog4 = require('koa-log4');

koaLog4.configure({
  appenders: {
    // 访问日志
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
      alwaysIncludePattern: true, // 文件名始终以日期区分
      encoding: 'utf-8',
      filename: path.join('logs/access', 'access.log') // 生成文件路径和文件名
    },
    // 系统日志
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
      alwaysIncludePattern: true, // 文件名始终以日期区分
      encoding: 'utf-8',
      filename: path.join('logs/application', 'application.log') // 生成文件路径和文件名
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application'], level: 'WARN' }
  }
});

exports.accessLogger = () => koaLog4.koaLogger(koaLog4.getLogger('access')); // 记录所有访问级别的日志
exports.systemLogger = koaLog4.getLogger('application'); // 记录所有应用级别的日志
