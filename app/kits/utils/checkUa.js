
const userAgent = navigator.userAgent

/**
 * 检查 App UA
 * @param  {String}  ua       [必需]
 * @param  {Array}   version  [可选]
 * @return {Boolean}
 * @example
  if (checkAppUa('com.ssp.shop')) {
    console.log(true)
  }
  if (checkAppUa('com.ssp.shop', ['1.0.0', '2.0.0'])) {
    console.log(true)
  }
 */
export const checkAppUa = (ua, versions = []) => {
  const isInApp = userAgent.indexOf(ua) > -1
  const filterVersion = versions.filter((itemValue) => userAgent.indexOf(itemValue) !== -1)

  if (isInApp && (versions.length === 0)) {
    // 单纯验证 App，不验证版本号
    return true
  } else if (isInApp && (filterVersion.length > 0)) {
    // 验证 App，并且验证版本号
    const reg = new RegExp(`${ua}.*[/]${filterVersion[0]}$`)
    return reg.test(userAgent)
  }
  return false
}

/**
 * 检查 App
 */
export const checkApp = () => {
  const isInApp = userAgent.indexOf('com.ssp.shop') > -1
  if (isInApp) {
    return true
  }
  return false
}

/**
 * 检查 App 版本
 */
export const checkAppVersion = () => {
  let version = ''
  if (checkApp()) {
    version = userAgent.match(/com.ssp.shop.*[/](\S*)/)[1]
  }
  return Number(version.replace(/\./g, ''))
}

/**
 * 检查 App 是 iOS 还是 android
 */
export const checkAppType = () => {
  const isInIos = userAgent.indexOf('com.ssp.shop.ios') > -1
  const isInAndroid = userAgent.indexOf('com.ssp.shop.android') > -1
  if (isInIos) {
    return 'ios'
  } else if (isInAndroid) {
    return 'android'
  }
  return false
}

/**
 * 检查在app外ios还是android
 */
export const checkClientType = () => {
  const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
  const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return 'android'
  } else if (isiOS) {
    return 'ios'
  }
  return false
}

/**
 * 检查微信
 */
export const checkWeixin = () => {
  const isWeixin = userAgent.toLowerCase().indexOf('micromessenger') !== -1
  return isWeixin
}
