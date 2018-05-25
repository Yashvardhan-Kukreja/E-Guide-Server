/**
 * Created by Yash 1300 on 16-04-2018.
 */

const TeacherTransactions = require('../database/teacher/teacherTransactions');
const SkillTransactions = require('../database/skill/skillTransactions');

const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

module.exports.verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err)
                    reject({success: false, message: "An error occurred"});
                else
                    decoded ? resolve(decoded) : reject({success: false, message: "Corrupted token provided"});
            });
        } else
            reject({success: false, message: "No token provided"});
    });
};

module.exports.fetchDetails = (id) => {
    return new Promise((resolve, reject) => {
        TeacherTransactions.findTeacherById(id, (err, outputTeacher) => {
            if (err)
                reject({success: false, message: "An error occurred"});
            else
                outputTeacher ? resolve({success: true, message: "Teacher details fetched", teacher: outputTeacher}) : reject({success: false, message: "No such teacher found"});
        });
    });
};

module.exports.addSkills = (id, skills) => {
    return new Promise((resolve, reject) => {
        TeacherTransactions.addSkills(id, skills, (err, outputTeacher) => {
            if (err) {
                console.log("An error occurred");
                reject({success: false, message: "An error occurred"});
            } else {
                outputTeacher ? resolve({success: true, message: "Updated the skill set", teacher: outputTeacher}) : reject({success: false, message: "No such teacher found"});
            }
        });
    });
};

module.exports.fetchAllSkills = () => {
    return new Promise((resolve, reject) => {
        SkillTransactions.fetchAllSkills((err, outputSkills) => {
            if (err) {
                console.log("An error occurred");
                reject({success: false, message: "An error occurred"});
            } else {
                outputSkills ? resolve({success: true, message: "All skills fetched", skills: outputSkills}) : reject({success: false, message: "An error occurred"});
            }
        });
    });
};