import { getUrlParam } from 'utils/args'

// debug mode
const DEBUG = getUrlParam('DEBUG') === '1'
const TEST = (process.env.NODE_ENV !== 'production') || false
let URL = {}

if (DEBUG) {
  URL = {
    wxApi: 'http://api.wx.isspu.com:3000',
    hostApi: 'http://api.h.t0.isspu.com',
    hostMain: 'http://h.t0.isspu.com',
  }
} else if (TEST) {
  URL = {
    wxApi: 'http://api.wx.isspu.com',
    hostApi: 'http://api.h.t0.isspu.com',
    hostMain: 'http://h.t0.isspu.com',
  }
} else {
  URL = {
    wxApi: 'http://api.wx.isspu.com',
    hostApi: 'http://api.h.isspu.com',
    hostMain: 'http://h.isspu.com',
  }
}

// host
const HOSTMAIN_WX_API = URL.wxApi
const HOSTAPI = URL.hostApi
const HOSTMAIN = URL.hostMain

const BAIDU_MAP = 'http://api.map.baidu.com/staticimage/v2'
const BAIDU_AK = 'BAWjP0Np7X4M2YmrWSZYNN2gDNkSCjmw'
const BAIDU_MAP_MARKER = 'http://api.map.baidu.com/marker'

// key
export const APP_KEY = '999'

// api func
export const getMapStaticImgUrl = (location) => {
  if (location) {
    return `${BAIDU_MAP}?ak=${BAIDU_AK}&center=${location}&width=375&height=240&zoom=14`
  }
  return ''
}

export const getMapAppUrl = (location, title, content) => {
  const swaplocation = `${location.split(',')[1]},${location.split(',')[0]}`
  return `${BAIDU_MAP_MARKER}?location=${swaplocation}&title=${title}
    &content=${content}&zoom=14&output=html&src=ssp`
}

export const getRouterUrl = () => `${HOSTAPI}/router`
// export const getApiPathUrl = (path) => `${HOSTAPI}/${path}`
export const getMainPathUrl = (path) => `${HOSTMAIN}/${path}`
export const getWxApiUrl = (path) => `${HOSTMAIN_WX_API}/${path}`
