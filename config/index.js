const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  isProduction,
  // databaseUrl: 'mongodb://wangxh:wangxh123456@192.168.242.1:27017/wxh0929?authSource=admin',
  databaseUrl: 'mongodb://wangxh:wangxh123456@127.0.0.1:27017/wxh0929?authSource=admin',
  // MODULE_SERVICE_URL: 'http://192.168.242.1:3000',
  MODULE_SERVICE_URL: 'http://127.0.0.1:3000'

};
