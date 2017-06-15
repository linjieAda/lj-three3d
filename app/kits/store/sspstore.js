
const STUSERNAME = 'sspusername'

export const storeUsername = (username) => {
  if (username !== '') {
    window.localStorage.setItem(STUSERNAME, username)
    // console.log('ls:', window.localStorage)
  } else {
    window.localStorage.removeItem(STUSERNAME)
  }
}

export const popUsername = () =>
  window.localStorage.getItem(STUSERNAME)
