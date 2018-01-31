import axios from 'axios';
//import FormData from 'FormData'



// export const createAudio = body => {
//     console.log("in audioActions", body)
//     return axios.post('/api/createAudio', body)
// }
// export const findAudio = body => {
//     return axios.get('/api/findAudio', body)
// }
// export const updateAudio = _ => {
//     return axios.put('/api/updateAudio/:id')
// }
// export const deleteAudio = _ => {
//     return axios.delete('/api/deleteAudio/:id')
// }

export function uploadSuccess({ data }) {
    return {
        type: 'UPLOAD_DOCUMENT_SUCCESS',
        data,
    };
}

export function uploadFail(error) {
    return {
        type: 'UPLOAD_DOCUMENT_FAIL',
        error,
    };
}

export function uploadDocumentRequest(data) {
        axios.post('/api/createAudio', data)
            .then(response => console.log(uploadSuccess(response)))
            .catch(error => console.log(uploadFail(error)));

}   
