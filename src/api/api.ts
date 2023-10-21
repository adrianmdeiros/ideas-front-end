import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-projif.vercel.app'
})


export default api