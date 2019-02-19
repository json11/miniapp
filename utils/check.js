

module.exports = {
  removeSpace: removeSpace,
  checkMoney: checkMoney,
  checkLandline: checkLandline,
  checkMobilePhone: checkMobilePhone,
  checkPhone: checkPhone,
  checkNumOrLCharacter: checkNumOrLCharacter,
  checkNumOrUpperCharacter: checkNumOrUpperCharacter,
  checkPersonName: checkPersonName,
  replacePoint: replacePoint,
  checkEmpty: checkEmpty,
  checkOnlyNum: checkOnlyNum,
  checkIdNum: checkIdNum,
  checkNumberEmpty: checkNumberEmpty
}

/*删除空格*/
export function removeSpace(c) {
  if (!c) { return c }
  return c.replace(/ /g, '')
}

/**
 * 姓名中间点转化
 * @param c
 */
export function replacePoint(c) {
  if (!c) { return c }
  return c.replace(/[.,．，。]/g, '·');
}

/*空检查*/
export function checkEmpty(num) {
  if (!num) {
    return false;
  }
  if (typeof (num) !== 'string') { return false }
  let reg = /^.+$/g;
  return reg.test(num)
}

/*空检查*/
function checkNumberEmpty(num) {
  if (typeof (num) === 'number') { return true }
  if (!num) {
    return false;
  }
  if (typeof (num) !== 'string') { return false }
  let reg = /^.+$/g;
  return reg.test(num)
}

/*纯数字检查*/
export function checkOnlyNum(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^\d+$/g;
  return reg.test(num)
}

/*身份证检测*/
export function checkIdNum(num) {
  var reg = /^(\d{14}|\d{17})(\d|[xX])$/g;
  if (!reg.test(num)) {
    return false;
  }
  var dataStr = num.substr(6, 8);
  var year = dataStr.substr(0, 4);
  var month = dataStr.substr(4, 2);
  var day = dataStr.substr(6, 2);
  var date = year + '-' + month + '-' + day;
  return (new Date(date).getDate() == date.substring(date.length - 2));
}

/*姓名检查*/
export function checkPersonName(num) {
  if (!checkEmpty(num)) { return false }
  let reg = new RegExp("^([\\\u4e00-\\\u9fa5]|[·]){1,20}$", "g");
  return reg.test(num)
}

/*银行卡校验*/
export function checkBankNum(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^[0-9]{16,19}$/g;
  return reg.test(num)
}

/*数字或大小写字母*/
export function checkNumOrCharacter(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^[0-9A-Za-z]+$/g;
  return reg.test(num)
}

/*数字或大写字母*/
export function checkNumOrUpperCharacter(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^[0-9A-Z]+$/g;
  return reg.test(num)
}

/*数字或小写字母*/
export function checkNumOrLCharacter(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^[0-9a-z]+$/g;
  return reg.test(num)
}

/*电话号码，手机号加座机号*/
export function checkPhone(num) {
  if (!checkEmpty(num)) { return false }
  return checkMobilePhone(num) || checkLandline(num)
}

/*手机号校验*/
export function checkMobilePhone(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^1[0-9]{10}$/g;
  return reg.test(num)
}

/*座机校验*/
export function checkLandline(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^[0-9]+-[0-9]+$/g;
  return reg.test(num)
}

/*金额校验*/
export function checkMoney(num) {
  if (!checkEmpty(num)) { return false }
  let reg = /^[0-9]+\.[0-9]+$/g;
  return reg.test(num)
}