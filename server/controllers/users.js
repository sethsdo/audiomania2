const passport = require('passport')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports = {
    create(req, res) {
        let body = req.body;
        let user = new User(body)
        console.log(user)
        user.save()
            .then(() => {
                console.log('success')
                req.session.User_Id = user.id;
                res.json({ id: user.id, name: `${user.firstname + '' + user.lastname}` })
            }) 
            .catch(err => {
                console.log("Error with registration.", err)
                return res.json({errors: err.errors})
            })
    },

    login: (req, res) => {
        console.log(req.body)
        let email = req.body.email;
        User.findOne({email: email}, (err, user) => {
            if(user){
                user.login(req.body.password, (err, isMatch) => {
                    if (err) {
                        return reg.json(err)
                    } else {
                        req.session.User_Id = user.id
                        console.log(req.session.User_Id)
                        return res.json(user)
                    }
                })
            }
            else{
                return res.json(err)
            }
        })
    },
    logout: (req, res) => {
        console.log("signed out")
        req.session.User_Id = null;
        console.log(req.session.User_Id)
        res.json(true);
    }
}