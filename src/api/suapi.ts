import axios from 'axios'

const suapi = axios.create({
  baseURL: import.meta.env.VITE_SUAPI_BASE_URL
})

export default suapi