import axios from 'axios'
import { convertToFormData } from './Helper'

export default class Axios {
  constructor(url) {
    const token = sessionStorage.token

    this.axios = axios.create({
      baseURL: url,
      Authorization: token ? 'Bearer ' + token : null
    })
  }

  async get(url, data, config = {}) {
    data = convertToFormData(data)
    return await this.axios.get(url, { params: data, ...config })
  }

  async post(url, data, config = {}) {
    data = convertToFormData(data)
    return await this.axios.post(url, data, config)
  }
}
