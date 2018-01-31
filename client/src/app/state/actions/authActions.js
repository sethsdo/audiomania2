import axios from 'axios';
import { SIGNING_IN, SIGNING_OUT, SIGNING_IN_SUCCESS, SIGNING_IN_ERROR, LOGOUT } from './types';
import {history} from '../../helper/history'

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
        .then((data) => {
            if (data.data === false) {
                console.log(data.data, false)
                history.push("/", false)
            }
            else {
                console.log(data.data, true)
                history.push("/home", {user : data.data})
                history.go()

                
            }
        })
        .catch(err => {
            console.log(err)
        })
}

