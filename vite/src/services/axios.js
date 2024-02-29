import axios from 'axios'
import config from '@/constants'

const service = axios.create({
  baseURL: config.url,
  withCredentials: true
})

const request = {
  token() {
    service.get(config.url + '/sanctum/csrf-cookie')
  },

  get(url) {
    return service.get(url)
  },

  post(url, data) {
    return service.post(url, data)
  },

  put(url, data) {
    return service.put(url, data)
  },

  patch(url, data) {
    return service.patch(url, data)
  },

  delete(url) {
    return service.delete(url)
  }
}

export default request
