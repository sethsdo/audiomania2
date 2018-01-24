'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name required..."],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "Last name required..."],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Sorry email already in system..."],
        required: 'Email address is required...',
        validate: {
            validator: (email) => {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return reg.test(email);
            },
            message: '{VALUE} in not a valid email...',
        },

    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: 8,
        // validate: {
		//     validator: function (value) {
		//         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8}/.test(value);
		//     },
		//     message: "Password failed validation, you must have at least 1 number, uppercase and special character..."
		// }
    },
})

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
})

UserSchema.methods.login = function (password, callback) {
    let self = this;
    bcrypt.compare(password, self.password, (err, isMatch) => {
        if (err) return callback("error")
        else callback(null, isMatch)
    }) 
        // .then( res => {
        //     if(!res) reject("passwords don't match")
        //     else resolve();
        // }) 
}

module.exports = mongoose.model('User', UserSchema)

const User = mongoose.model('User', UserSchema)