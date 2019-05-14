import axios, { CancelToken } from 'axios'

export default class Axios {
  constructor(url) {
    this.axios = axios.create({
      baseURL: url,
      headers: {
        Authorization: localStorage.token ? 'Bearer ' + localStorage.token : null
      }
    })

    this.cancelToken = CancelToken.source()
  }

  async get(url, data, config = {}) {
    return await this.axios.get(url, {
      params: data,
      cancelToken: this.cancelToken.token,
      ...config
    })
  }

  async post(url, data, config = {}) {
    return await this.axios.post(url, data, {
      cancelToken: this.cancelToken.token,
      ...config
    })
  }

  cancel() {
    this.cancelToken.cancel()
  }
}
