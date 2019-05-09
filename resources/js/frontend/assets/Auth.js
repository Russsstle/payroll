import Axios from './Axios'

const axios = new Axios()

async function login(data) {
  return await axios.post('/login', data)
}

async function logout() {
  axios.post('/logout', null, {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  })
  localStorage.clear()
}

export default { login, logout }
