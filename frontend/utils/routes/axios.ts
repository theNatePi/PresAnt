import axios from 'axios';

const Backend = axios.create({
  baseURL: 'http://172.20.10.5:5000',
  withCredentials: true,
});

export default Backend;
