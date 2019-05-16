import Axios from './Axios'

const axios = new Axios()

export var refreshAuth = null
export var user = null

export async function login(data, type) {
  data.append('type', type)
  return await axios.post('/login', data)
}

export async function logout() {
  axios.post('/logout', null, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
  localStorage.clear()
}

export function setUser(info) {
  user = info
}

export function setRefreshAuth(auth) {
  refreshAuth = auth
}
