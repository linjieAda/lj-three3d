import * as API from './api'
import fetch from 'isomorphic-fetch'
import Cookies from 'js-cookie'
import { hex_md5 } from './md5' // eslint-disable-line
import Utf8 from 'utf8'

let tikenChecked = false

// private methods
const getToken = () => {
  const tk = Cookies.get('_h5_tk_')
  if (tk == null || tk === undefined) {
    return ''
  }
  return tk
}

const getApiSign = (jsondata) => {
  const dataArray = Object.keys(jsondata).sort()
  let str = ''
  for (let i = 0; i < dataArray.length; i++) {
    str = str + dataArray[i] + jsondata[dataArray[i]]
  }
  str = str + getToken()
  str = Utf8.encode(str)
  return hex_md5(str)
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// reload when error code 40
const isH5TokenValid = (response) => {
  if (response.success === false && response.errCode === '40' && !tikenChecked) {
    console.log('session过期，自动刷新页面')
    tikenChecked = true
    return false
  }
  tikenChecked = false
  return true
}

// nodeFetch
export const nodeFetch = (options) => {
  const {
    url = '',
    methodType = 'GET',
    callback = () => {},
  } = options

  fetch(url, {
    method: methodType,
  })
  .then((res) => {
    const data = res.json()
    return data
  })
  .then((jsonData) => {
    callback(jsonData)
  })
  .catch((ex) => {
    console.log('failed', ex)
  })
}

// exports
export const query = (rawdata, success) => {
  const basedata = {
    appKey: API.APP_KEY,
    timestamp: new Date().getTime(),
    v: '1.0',
  }
  Object.keys(rawdata).forEach((s) => { basedata[s] = rawdata[s] })
  basedata.sign = getApiSign(basedata)

  const body = Object.keys(basedata)
    .map(key => (`${encodeURIComponent(key)}=${encodeURIComponent(basedata[key])}`))
    .join('&')

  const myInit = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    body,
  }

  return fetch(API.getRouterUrl(), myInit)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => isH5TokenValid(response) ? success(response) : query(rawdata, success)) // eslint-disable-line
    // .catch((e) => console.log('网络错误', e))
}

export const queryurl = (url, success) =>
  fetch(url, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', mode: 'cors', } })
    .then(res => res.text())
    .then(res => success(res))
    // .catch(() => console.log('网络错误'))

export const getRouterUrl = () => API.getRouterUrl()
export const urlFromMainPath = (path) => API.getMainPathUrl(path)
export const urlFromWxApiPath = (path) => API.getWxApiUrl(path)

// web func
export const getURLParameter = (name) =>
  decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`)
    .exec(location.search) || [, ''])[1] // eslint-disable-line
    .replace(/\+/g, '%20')) || null
