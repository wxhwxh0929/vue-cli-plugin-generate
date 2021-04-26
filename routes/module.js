/**
 * koa-router这个middleware，负责处理URL映射
 */
const router = require('koa-router')();

const moduleController = require('../server/controller/module.controller');

router.prefix('/module');

router.get('/getModule', moduleController.moduleFindApi);

module.exports = router;
