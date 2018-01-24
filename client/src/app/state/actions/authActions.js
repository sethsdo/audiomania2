import axios from 'axios';
import { SIGNING_IN, SIGNING_OUT, SIGNING_IN_SUCCESS, SIGNING_IN_ERROR, LOGOUT } from './types';

export const register = body => {
    console.log("in authActions", body)
    return axios.post('/api/register', body)
}
export const login = body => {
    return axios.post('/api/login', body)
}
export const logout = _ => {
    return axios.get('/api/logout')
}
export const attemptAuth = _ => {
    return axios.get('/api/authenticate')
}

