import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const tokens = cookies.get('tokens')

const suapi = axios.create({
  baseURL: 'https://suap.ifma.edu.br/api/v2/',
  headers:{
    "Content-Type": "application/json"
  }
})


if(tokens){
  suapi.defaults.headers['Authorization'] = `Bearer ${tokens.access}`
}

export default suapi