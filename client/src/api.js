import axios from 'axios';

const api = axios.create({
    baseURL: 'https://urlshortner-backend-tlbj.onrender.com/auth'
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);