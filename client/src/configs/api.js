import axios from "axios"

console.log(process.env.NEXT_PUBLIC_API_URL);

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL: 'https://api.satellite-bookshelf.com'}`,
  withCredentials: true
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;