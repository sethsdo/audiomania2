'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Object = Schema.ObjectId;

const AudioSchema = Schema({
    clipName: {
        type: String,
        min: 3, max: 100, 
        required: [true, "ClipName required..."],
        trim: true,
    },
    blob: {
        type: Buffer,
        required: true,
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    meta: {
        likes: Number,
        user_id: [{ type: Object }]
    },
    creator: { type: Object, ref: 'User' },
    comments: [{ type: Object }],
})


module.exports = mongoose.model('Audio', AudioSchema)