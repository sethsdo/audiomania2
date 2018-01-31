const mongoose = require('mongoose')
const User = mongoose.model('User')
const session = require('express-session')

module.exports = {

    authenticate: (req, res) => {
        console.log(req.session.User_Id, "in authenticate")
        let err = false
        if(!req.session.User_Id) {
            return res.send(false)
        } else {
            User.findById({_id: req.session.User_Id})
                .then(user => { 
                    //console.log(user, "here")
                    return res.json(user)
                })
                .catch(err => {
                    console.log("err")
                    return res.json(false)
                })
        }
    }
}