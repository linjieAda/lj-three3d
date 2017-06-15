/**
 * 修改页面title
 * @param  {String} title
 */
import { checkAppUa } from 'utils/checkUa'

export const setDocumentTitle = (title) => {
  document.title = title

  // 排除app
  if (checkAppUa('com.ssp.shop')) {
    return
  }

  // ios下刷新微信title
  const client = /(iPad|iPhone|iPod)/i
  const ua = navigator.userAgent
  const isWeixin = ua.toLowerCase().indexOf('micromessenger') !== -1

  if (client.test(ua) && isWeixin) {
    setTimeout(() => {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('src', '/favicon.ico')
      iframe.setAttribute('style', 'display:none;')
      // 利用iframe的onload事件刷新页面
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }, 0)
  }
}
