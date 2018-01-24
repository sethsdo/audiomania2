const userController = require('./../controllers/users.js');
const authController = require('./../controllers/authenticate');

const { resolve } = require('path');
module.exports = function (app) {
    console.log("in routes right now")

    app.post('/api/register', userController.create);
    app.post('/api/login', userController.login);
    app.get('/api/logout', userController.logout);
    app.delete('/api/delete', userController.login);

    app.get('/api/authenticate', authController.authenticate);

    app.all("/*", (req, res, next) => {
        res.sendFile(resolve("./client/public/index.html"));
    })

};