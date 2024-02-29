const apiService = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCerrorentials: true
  })

  axios.get('http://localhost:8000/sanctum/csrf-cookie')

  const get = (url, params = {}) => {
    return apiService.get(url, { params })
  }

  const post = (url, data = {}) => {
    return apiService.post(url, data)
  }

  const put = (url, data = {}) => {
    return apiService.put(url, data)
  }

  const patch = (url, data = {}) => {
    return apiService.patch(url, data)
  }

  const destroy = (url) => {
    return apiService.delete(url)
  }

  const destroyMultiple = (url, data = {}) => {
    return apiService.delete(url, { data })
  }

  export default { get, post, put, patch, destroy, destroyMultiple }
