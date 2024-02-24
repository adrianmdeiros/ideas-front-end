import axios from 'axios'

const suapi = axios.create({
  baseURL: 'https://suap.ifma.edu.br/api/v2/'
})

export default suapi