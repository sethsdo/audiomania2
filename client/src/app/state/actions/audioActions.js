import axios from 'axios';



export const createAudio = body => {
    console.log("in audioActions", body)
    return axios.post('/api/createAudio', body)
}
export const login = body => {
    return axios.post('/api/findAudio', body)
}
export const logout = _ => {
    return axios.get('/api/updateAudio')
}
export const attemptAuth = _ => {
    return axios.get('/api/deleteAudio/')
}

// app.post('/api/createAudio', audioController.create);
// app.get('/api/findAudio', audioController.findAll);
// app.put('/api/updateAudio/:_id', audioController.update)
// app.delete('/api/deleteAudio/:_id', audioController.delete);