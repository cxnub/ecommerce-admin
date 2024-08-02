import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'https://42alcr5e0f.execute-api.us-east-1.amazonaws.com/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;