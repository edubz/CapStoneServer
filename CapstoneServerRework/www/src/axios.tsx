import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://api.theinput.tk/',
});
