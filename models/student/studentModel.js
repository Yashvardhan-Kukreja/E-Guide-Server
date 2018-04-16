/**
 * Created by Yash 1300 on 16-04-2018.
 */

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    favTeachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher'
        }
    ]
});

module.exports = mongoose.model('Student', studentSchema, "students");