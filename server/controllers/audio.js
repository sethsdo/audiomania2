const Audio = require('../models/audio')
const mongoose = require('mongoose')

module.exports = {
    create(req, res) {
        let body = req.body;
        let audioFile = new Audio(body)

        audioFile.save()
            .then(() => {
                console.loog("Audio File Created")
            })
            .catch(err => {
                console.log("Error With Creation: ", err)
            })
    },
    read: (req, res) => {
        Audio.find( (err, audio)
            .then(() => {
                res.status(200).send(audio)
            })
            .catch(err => {
                res.status(500).send(err)
            })
        )
    },
    update: (req, res) => {
        Audio.findById(req.params.id, (err, file)
            .then(() => {
                //find user and add like, 
            }))
    },
    delete: (req, res) => {
        Audio.findByIdAndRemove(req.params.id, (err, file)
            .then(() => {
                let response = {
                    message: "Successful delete",
                    id: todo._id
                }
                res.status(200).send(response)
            })
            .catch(err => {
                    console.log("err")
                    return res.json(false)
            }))
    }
}