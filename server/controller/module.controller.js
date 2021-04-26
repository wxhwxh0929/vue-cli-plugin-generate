const moduleModel = require('../model/module.model');
const constant = require('../../utils/constant');

/**
 * @functionName {Function} moduleFindApi
 * @description {String}
 * @param {*} ctx
 * @param {*} next
 */
const moduleFindApi = async (ctx, next) => {
  let {} = ctx.request.query;
  const result = await moduleModel.moduleFind({});
  // console.log('------');
  // console.log(result);
  if (result) {
    return {
      code: constant.SUCCESS_CODE,
      data: result,
      errMsg: ''
    };
  } else {
    return {
      code: constant.SUCCESS_CODE,
      data: result,
      errMsg: ''
    };
  }
};

module.exports = {
  moduleFindApi
};
