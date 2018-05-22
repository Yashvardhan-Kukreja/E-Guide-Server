/**
 * Created by Yash 1300 on 17-05-2018.
 */

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Skill', skillSchema, "skills");