const mongoose = require('../../utils/mongoose').mongoose;

/**
 * 模块的数据库模型
 */
const ModuleSchema = new mongoose.Schema({
  moduleName: String
});
const Module = mongoose.model('modules', ModuleSchema);

/**
 * @description moduleAdd 增
 * @param moduleInfo {Object} 添加元素的信息
 * @param cb {Function} 回调函数
 */
const moduleAdd = (moduleInfo, cb) => {
  const moduleInstance = new Module(moduleInfo);
  moduleInstance.save().then((result) => {
    cb(result);
  });
};

/**
 * @description moduleDelete 删
 * @param moduleInfo {Object} 删除条件
 * @param cb {Function} 回调函数
 */
const moduleDelete = (moduleInfo, cb) => {
  Module.remove(moduleInfo).then((result) => {
    cb(result);
  });
};

/**
 * @description moduleUpdate 改
 * @param queryInfo {Object} 查询条件
 * @param moduleUpdateInfo {Object} 修改信息
 * @param cb {Function} 回调函数
 */
const moduleUpdate = (queryInfo, moduleUpdateInfo, cb) => {
  Module.updateOne(queryInfo, moduleUpdateInfo).then((result) => {
    cb(result);
  });
};

/**
 * @description moduleFind 查
 * @param moduleInfo {Object} 查询条件
 * @param pageSize {Number} 页数大小
 * @param page {Number} 页码
 */
const moduleFind = async (moduleInfo, pageSize, page) => {
  return Module.find(moduleInfo).skip((Number(page) - 1) * Number(pageSize)).limit(Number(pageSize));
};

module.exports = {
  moduleAdd,
  moduleDelete,
  moduleUpdate,
  moduleFind
};
