import axios from 'axios';

const Backend = axios.create({
  baseURL: 'http://172.20.10.9:5000',
  withCredentials: true,
});

export default Backend;
