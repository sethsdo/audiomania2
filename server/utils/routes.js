const userController = require('./../controllers/users.js');
const authController = require('./../controllers/authenticate');
const audioController = require('./../controllers/audio.js');

const { resolve } = require('path');
module.exports = function (app) {
    console.log("in routes right now")

    //user routes
    app.post('/api/register', userController.create);
    app.post('/api/login', userController.login);
    app.get('/api/logout', userController.logout);
    app.delete('/api/delete', userController.login);

    //authentication route
    app.get('/api/authenticate', authController.authenticate);

    app.post('/api/createAudio', audioController.create);
    //app.get('/api/findAudio', audioController.findAll);
    app.put('/api/updateAudio/:_id', audioController.update)
    app.delete('/api/deleteAudio/:_id', audioController.delete);


    app.all("/*", (req, res, next) => {
        res.sendFile(resolve("./client/public/index.html"));
    })

};