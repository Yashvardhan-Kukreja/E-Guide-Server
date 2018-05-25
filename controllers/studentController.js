/**
 * Created by Yash 1300 on 16-04-2018.
 */

const StudentTransactions = require('../models/student/studentTransactions');
const TeacherTransactions = require('../models/teacher/teacherTransactions');
const FavoriteTransactions = require('../models/favorite/favoriteTransactions');

const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

module.exports.verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err)
                    reject({success: false, message: "An error occurred"});
                else {
                    decoded ? resolve(decoded) : reject({success: false, message: "Corrupted token provided"});
                }
            });
        } else {
            reject({success: false, message: "No token provided"});
        }
    });
};

module.exports.fetchDetails = (id) => {
    return new Promise((resolve, reject) => {
        StudentTransactions.findStudentById(id, (err, outputStudent) => {
            if (err)
                reject({success: false, message: "An error occurred"});
            else {
                outputStudent ? resolve({success: true, message: "Students details fetched", student: outputStudent}) : reject({success: false, message: "No such student found"});
            }
        });
    });
};

module.exports.favorTeacher = (studentId, teacherId, skillId) => {
    return new Promise((resolve, reject) => {
        FavoriteTransactions.addFavorite(studentId, teacherId, skillId, (err, outputFavorite) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                let favoriteId = outputFavorite._id;
                StudentTransactions.appendFavTeacher(studentId, favoriteId, (err, outputStudent) => {
                    if (err) {
                        console.log(err);
                        reject({success: false, message: "An error occurred"});
                    } else {
                        if (!outputStudent)
                            reject({success: false, message: "No student corresponding to this id"});
                        else {
                            TeacherTransactions.appendStudent(studentId, teacherId, (err, outputTeacher) => {
                                if (err) {
                                    console.log(err);
                                    reject({success: false, message: "An error occurred"});
                                } else {
                                    outputTeacher ? resolve({success: true, message: "Teacher added to favorites"}) : reject({success: false, message: "No teacher found corresponding to this id"});
                                }
                            });
                        }
                    }
                });
            }
        });
    });
};

module.exports.unfavorTeacher = (studentId, teacherId, skillId) => {
    return new Promise((resolve, reject) => {
        FavoriteTransactions.removeFavorite(studentId, teacherId, skillId).exec(err => {
            err ? reject({success: false, message: "Problem occurred while removing the teacher from favorites"}) : resolve({success: true, message: "Removed the teacher from favorites"});
        });
    });
};


module.exports.fetchFavTeachers = (studentId) => {
    return new Promise((resolve, reject) => {
        StudentTransactions.findStudentById(studentId, (err, outputStudent) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                outputStudent ? resolve({success: true, message: "Successfully fetched favorite teachers", favTeachers: outputStudent.favTeachers}) : reject({success: false, message: "No student found with this id"});
            }
        });
    });
};