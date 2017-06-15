export const getUrlParam = (name, url) => {
  /* eslint-disable */
  const param = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]')
  const urlPath = url ? ('?' + url.split('#')[0].split('?')[1]) : window.location.search
  const results = RegExp('[?&]' + param + '=([^&#]*)').exec(urlPath)
  return results ?  decodeURIComponent(results[1].replace(/\+/g, ' ')) : ''
  /* eslint-enable */
}
