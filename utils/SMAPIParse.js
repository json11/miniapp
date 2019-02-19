/**
 * Created by wangtieshan on 2017/11/12.
 */

// export type parseSetType = {
//     success: string,
//     token: string[],
// }

const parseDefaultSet = {
    success: '200',
    token: ['-2', '5001']
};

const defaultNetError = {
    code: '500',
    message: '未知错误',
};

/**
 * 解析网络返回数据，默认解析 code data message 格式
 * @param data 服务器数据
 * @param error 网络错误 {code: string, message: string}
 * @param parseSet 配置 {'suc': '200', 'token': '-2'}
 */
function parse(data, error, parseSet = parseDefaultSet) {

    if (error) {
        return parseNetError(error, parseSet);
    }

    // 无 data
    if (!data) {
        return formatError(parseSet)
    }

    const {code, message} = data;

    // 无 code
    if (!code) {
        return formatError(parseSet)
    }

    const {success, token} = parseSet;

    // 无 message
    if (code != success && !message) {
        return formatError(parseSet);
    }

    if (code == success) {
        return null;
    } else {
        return new SMError(code, message, parseSet, SMErrorData);
    }
}

/**
 * 解析网络错误
 * @param error 网络错误
 * @param parseSet 解析设置
 * @returns {SMError}
 */
function parseNetError(error, parseSet) {

    if (!error) {return null}

    let eCode = error.code || defaultNetError.code;

    return new SMError(eCode, netErrorMsgByCode(eCode, error.message), parseSet, SMErrorNet)
}

function netErrorMsgByCode(code, message) {
  if (message) {
    return message
  }
  if (code == '500') {
      return "内部服务器错误";
  } else if (code == '503') {
      return "内部服务器不可用";
  } else if (code == '-1011') {
      return "无法连接服务器";
  } else if (code == '-1001') {
      return "请求超时，请在网络好的情况下重试";
  } else if (code == '-1004') {
      return "未能连接到服务器";
  } else if (code == '-1009') {
      return "网络无连接 请检查网络";
  } else if (code == '-1003') {
      return "未能连接到服务器";
  } else {
      return `请求失败`
  }
}

/**
 * 格式错误
 * @param parseSet 解析配置
 * @returns {SMError}
 */
function formatError(parseSet) {
    return new SMError('500', '服务器数据格式错误', parseSet, SMErrorData);
}

/**
 * 数据错误
 * @type {string}
 */
const SMErrorData = 'data';

/**
 * 网络错误
 * @type {string}
 */
const SMErrorNet = 'net';

/**
 * 错误信息类（网络错误）
 */
export class SMError {

    constructor(code = defaultNetError.code, message = defaultNetError.message, parseSet = parseDefaultSet, errorType = SMErrorNet) {
        this.code = code;
        this.message = message;
        this.parseSet = parseSet;
        if (!this.hasOwnProperty('errorType')) {
            console.warn("请执行 'npm install' 升级 react-pa-common 包")
        }
        this.errorType = errorType;
    }

    code = null;

    message = null;

    errorType = SMErrorNet;

    parseSet = null;

    isDataError() {
      return this.errorType === SMErrorData;
    }

    /**
     * 是否是网络错误
     * @returns {boolean}
     */
    isNetError() {
        return this.errorType === SMErrorNet;
    }

    /**
     * 是否是token 错误
     * @returns {boolean}
     */
    isTokenFail() {
        return this.parseSet.token.indexOf(this.code) >= 0;
    }

    isSuccess() {
        return this.code == this.parseSet.success;
    }

    isCancel() {
        return this.code == '-999'
    }

    showMessage() {
        return `${this.message}(${this.code})`
    }
}

module.exports = {
  parseDefaultSet: parseDefaultSet,
  defaultNetError: defaultNetError,
  parse: parse,
  parseNetError: parseNetError,
  SMError: SMError,
  formatError: formatError
}