
let app = getApp();

const URLDefines = {
  waitTask: 'home/waittask',   // 待办任务列表
  myTask: 'myself/mytask', // 我的任务，全部任务
  merchantInfo: 'merchant/info', // 意向商户详情
  addIntendedVisit: 'intendedVisit/saveRecord', // 新增拜访记录
  updateIntendedVisit: 'intendedVisit/updateRecord', // 更新拜访记录
  updateMerchantIntended: 'merchant/updateIntended', // 更新意向商户信息
  addMerchantIntended: 'merchant/saveIntended', // 新增意向商户
  addMerchantIntendedConst: 'merchant/prop', // 增加意向商户获取常量

  merchantSearch: 'merchant/addbeforesearch', // 商户查询
};

function getFullPath(path) {
  if (!app) { app = getApp() }
  return app.urlInfo.baseUrl + path;
}

function request(subPath, options = {}) {
  if (subPath) {
    Object.assign(options, { path: getFullPath(subPath) })
  }
  options.params = options.params || {}
  options.header = options.header || {}
  if (app.userInfo.token) {
    Object.assign(options.header, { token: app.userInfo.token })
  }
  app.request(options)
}

module.exports = {
  request: request,
  URLDefines: URLDefines
}