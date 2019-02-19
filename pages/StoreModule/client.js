
let app = getApp();

const URLDefines = {
  storeList: 'store/list',        // 门店列表
  kanban: 'store/info/kanban',    // 门店看板
  storeInfo: 'store/info',        // 门店信息
  carModelList: 'store/carModelList',  // 门店合作车型列表
  orderlist: 'store/info/orderlist',   // 门店-订单查询列表
  orderdetail: 'store/order/info',     // 门店-订单详情
  pendingpaymentList: 'store/info/kanban/pendingpayment' // 门店-看板-待付款列表
};

function getFullPath(path) {
  if (!app) { app = getApp() }
  return app.urlInfo.baseUrl + path;
  // return 'https://easy-mock.com/mock/5c3ca5cc64a63515514486d2/miniapp/' + path;
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