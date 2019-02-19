
let app = getApp();

const URLDefines = {
  mineInfo: 'system/mine',
  verifyOldPwd: 'system/verifyOldPwd',
  updatePwd: 'system/updatePwd',
  logOut: 'system/quit',
  hierarchy: 'system/hierarchy'
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

module.exports = {
  request: request,
  URLDefines: URLDefines
}