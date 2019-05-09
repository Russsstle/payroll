import Axios from './Axios'

export default class Api extends Axios {
  constructor(name) {
    super('/api/' + name)
  }

  async get(params = {}) {
    return await this.axios.get('/', { params })
  }
  async find(id, params = {}) {
    return await this.axios.get('/' + id, { params })
  }
  async add(data) {
    return await this.axios.post('/', data)
  }
  async update(data) {
    data.append('_method', 'PUT')
    return await this.axios.post('/', data)
  }
  async remove(data) {
    data.append('_method', 'DELETE')
    return await this.axios.post('/', data)
  }
}
