import axios from "axios"

const instance = axios.create({
  baseURL: process.env.BASE_API_URL,
  withCredentials: true
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;