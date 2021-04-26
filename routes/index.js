/**
 * koa-router这个middleware，负责处理URL映射
 */
const router = require('koa-router')();

const templateData = require('../public/js/home/templateData');

router.get('/', async (ctx, next) => {
  await ctx.render('index', templateData);
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  };
});

module.exports = router;
