
let app = getApp();

const URLDefines = {
  homeInfo: 'home/info',
  waitTask: 'home/waitmodule', // 待办任务
};

function getFullPath(path) {
  if (!app) {
    app = getApp()
  }
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

// 登录接口请求
function getHomeInfo(options) {
  request(URLDefines.homeInfo, options)
}

// 获取待办任务数据
function getWaitTaskInfo(options) {
  request(URLDefines.waitTask, options)
}

module.exports = {
  request: request,
  URLDefines: URLDefines,
  getHomeInfo: getHomeInfo,
  getWaitTaskInfo: getWaitTaskInfo
}