/**
 * Created by Yash 1300 on 16-04-2018.
 */

const Teacher = require('./teacherModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports.findTeacherByUsernameOrEmail = (input, next) => {
    Teacher.findOne({$or:[{username: input}, {email: input}]}).exec(next);
};

module.exports.findTeacherById = (id, next) => {
    Teacher.findOne({_id: id}, {_id: 0, password: 0}).exec(next);
};

module.exports.addTeacher = (name, username, email, password, contact, skills, next) => {
    let newTeacher = new Teacher({
        name: name,
        username: username,
        email: email,
        password: password,
        contact: contact,
        skills: skills
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(newTeacher.password, salt, null, (err, hash) => {
            if (err)
                return next(err);
            newTeacher.password = hash;
            newTeacher.save(next);
        });
    });
};

module.exports.verifyPassword = (teacher, passwordInput) => {
    return bcrypt.compareSync(passwordInput, teacher.password);
};

module.exports.generateToken = (teacher, secret) => {
    return jwt.sign(JSON.parse(JSON.stringify(teacher)), secret);
};