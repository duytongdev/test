import apiService from './apiService'

const getItems = (url, params) => {
  return apiService.get(url, params)
}

const getItemById = (table, id) => {
  return apiService.get(`products/${id}`)
}

const createItem = (url, data) => {
  return apiService.post(url, data)
}

const updateItem = (id, data) => {
  return apiService.put(`products/${id}`, data)
}

const deleteItem = (url) => {
  return apiService.destroy(url)
}

const deleteItems = (url, ids) => {
  return apiService.destroyMultiple(url, ids)
}

export default {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  deleteItems
}
