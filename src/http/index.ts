import axios from "axios";


const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,

})

http.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    // const refresh = sessionStorage.getItem('refresh');
    if (token && config.headers) {
        config.headers.Authorization = `JWT ${token}`;
    }

    return config;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
})

export default http;