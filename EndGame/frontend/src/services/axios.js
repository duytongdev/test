import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

axios.get('http://localhost:8000/sanctum/csrf-cookie')

export default request
