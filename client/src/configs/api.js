import axios from "axios"

const instance = axios.create({
  baseURL: process.env.BASE_API_URL ? process.env.BASE_API_URL : 'http://164.92.237.184:3001/api',
  withCredentials: true
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;