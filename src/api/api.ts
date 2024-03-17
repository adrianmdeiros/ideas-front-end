import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-projif.vercel.app'
    // baseURL: 'http://172.22.175.163:3000'
})


export default api