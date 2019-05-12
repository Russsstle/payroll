import Axios from './Axios'

const axios = new Axios()

export var refreshAuth = null
export var userInfo = null

export async function login(data) {
  return await axios.post('/login', data)
}

export async function logout() {
  axios.post('/logout', null, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
  localStorage.clear()
}

export function setUserInfo(info) {
  userInfo = info
}

export function setRefreshAuth(auth) {
  refreshAuth = auth
}
