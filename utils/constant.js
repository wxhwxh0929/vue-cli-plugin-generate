module.exports = {
  CONNECT_SUCCESS: '  数据库连接成功...',
  CONNECT_FAIL: '  数据库连接失败...',
  SUCCESS_CODE: '200',
  FAIL_CODE: 'fail',
  codeMessage: {
    '-1': '网络连接失败',
    200: '请求成功，服务器返回数据',
    400: '发出的请求有错误，服务器没有进行新建或者修改数据的操作',
    301: '永久重定向',
    302: '临时重定向，处理服务器的负载均衡',
    304: '读取缓存数据',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器进行维护中',
    504: '网关超时'
  }

};