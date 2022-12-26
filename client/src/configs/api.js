import axios from "axios"

const instance = axios.create({
  baseURL: "https://api.satellite-bookshelf.com/api",
  withCredentials: true
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;