const nunjucks = require('nunjucks');

function createEnv (path, opts) {
  const
    autoescape = opts.autoescape === undefined ? true : opts.autoescape;
  const noCache = opts.noCache || false;
  const watch = opts.watch || false;
  const throwOnUndefined = opts.throwOnUndefined || false;
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path || 'views', {
      noCache: noCache,
      watch: watch
    }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    });
  if (opts.filters) {
    for (const f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

/**
 * @description middleware的作用是给ctx对象绑定一个render(view, model)的方法，这样，后面的Controller就可以调用这个方法来渲染模板了。
 * @param {*} path
 * @param {*} opts
 * @returns
 */
function templating (path, opts) {
  // 创建Nunjucks的env对象:
  const env = createEnv(path, opts);
  return async (ctx, next) => {
    // 给ctx绑定render函数:
    ctx.render = function (view, model) {
      // 把render后的内容赋值给response.body:
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
      // 设置Content-Type:
      ctx.response.type = 'text/html';
    };
    // 继续处理请求:
    await next();
  };
}

module.exports = templating;
