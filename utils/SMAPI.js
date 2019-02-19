/**
 * Created by wangtieshan on 2017/10/24.
 */

import { SMError, parse, parseNetError, parseDefaultSet, formatError } from "./SMAPIParse";

const logger = wx.getLogManager({ level: 0 })

let app = getApp()

// /*网络请求参数*/
// interface SMNetRequestOptions {
//     /*路径*/
//     path: string;
//     /*解析配置*/
//     parseSet: parseSetType;
//     /*是否是post请求*/
//     post: boolean;
//     /*是否是 json 请求*/
//     json: boolean;
//     /*参数*/
//     params: string;
//     /*超时时间*/
//     timeOut: number;
//     /*请求头*/
//     header: any;
//     /*自动使用app展示错误信息，支持 function 处理后回调，支持 boolean 类型指定是否自动处理*/
//     autoDealError: ()=>void | boolean;
//     /*数据校验完整性*/
//     dataValidate: ({ data: any, inData: any }) => boolean;
//     /*
//     请求结束 
//     data: 成功回调，网络请求返回的原始数据
//     error: 失败回调，如果配置了 parseSet 为解析之后的错误信息，否则只代表网络解析错误
//     */
//     complete: ({data: any, error: SMError, inData: any})=>void;
// }

/**
 * 网络请求
 * @param options 请求信息
 */
function request(options) {
  if (!app) {
    app = getApp()
  }
  logger.log('---发出网络请求---', options.path)
  logger.log(options);
  console.log('---发出网络请求---', options.path)
  console.log(options);
  const { complete, header = {}, params = {}, post = true, parseSet = parseDefaultSet} = options
  wx.showNavigationBarLoading()
  wx.request({
    url: options.path,
    data: options.params,
    header: options.header || {},
    method: post ? 'POST' : 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {

      wx.hideNavigationBarLoading()

      logger.log('---网络请求返回---', options.path)
      logger.log(res)

      console.log('---网络请求返回---', options.path)
      console.log(res);
      console.log(res.data)
      
      let data = res.data || {};

      let error = null
      
      // 网络错误
      error = res.statusCode == 200 ? null : parseNetError({ code: res.statusCode })

      // code data message 自动解析
      if (!error) {
        error = parseSet ? parse(data, error, parseSet) : parseNetError(error);
      }

      // 自定义的内容合法性校验
      if (!error && options.dataValidate && !options.dataValidate({ data: data, inData: data.data })) {
        error = formatError()
      }
      
      if (error && error.isTokenFail()) {
        app.makeHint('登录失效，请重新登录')
        wx.reLaunch({
          url: '/pages/LoginModule/Login/Login',
        })
        return;
      }

      if (error && _autoDealError(options.autoDealError, error)) {
        return
      }

      if (complete) {
        complete({ data: data || {}, error: error, inData: data.data });
      }
    },
    fail: function (res) {

      wx.hideNavigationBarLoading()

      logger.log('---网络请求返回---', options.path)
      logger.log(res)

      console.warn('---网络请求返回---', options.path)
      console.warn(res);

      let message = ((res.errMsg === 'request:fail timeout') && '请求超时') || null

      let error = parseNetError({ code: '500', message: message })

      if (error && error.isTokenFail()) {
        wx.reLaunch({
          url: '/pages/LoginModule/Login/Login',
        })
        return;
      }

      if (_autoDealError(options.autoDealError, error)) {
          return
      }
      if (complete) {
        complete({ data: {}, error: error, inData: null });
      }
    },
  })
}

function _autoDealError(autoDealError, error) {
  const t = typeof autoDealError
  if (autoDealError) {
    app.makeHint(error.showMessage())
    if (t === 'function') {
      autoDealError()
    }
    return true
  }
  return false
}

module.exports = {
  request: request
}