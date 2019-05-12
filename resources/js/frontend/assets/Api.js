import Axios from './Axios'

export default class Api extends Axios {
  constructor(name) {
    super('/api')
    this.name = name
  }

  async get(params = {}) {
    return await this.axios.get(this.name, { params })
  }
  async find(id, params = {}) {
    return await this.axios.get(this.name + '/' + id, { params })
  }
  async add(data) {
    return await this.axios.post(this.name, data)
  }
  async update(id, data) {
    data.append('_method', 'PUT')
    return await this.axios.post(this.name + '/' + id, data)
  }
  async remove(id) {
    data.append('_method', 'DELETE')
    return await this.axios.post(this.name + '/' + id, data)
  }
}
