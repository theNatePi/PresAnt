import axios from 'axios';

const Backend = axios.create({
  baseURL: 'http://169.234.73.190:5000',
  withCredentials: true,
});

export default Backend;
