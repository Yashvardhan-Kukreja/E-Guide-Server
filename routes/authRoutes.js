/**
 * Created by Yash 1300 on 16-04-2018.
 */

const express = require('express');

const authController = require('../controllers/authController');
const router = express.Router();

// Route for registering a student
router.post('/student/register', (req, res) => {
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let contact = req.body.contact;

    authController.registerStudent(name, username, email, password, contact).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

// Route for registering a teacher
router.post('/teacher/register', (req, res) => {
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let contact = req.body.contact;
    let skills = (req.body.skills).split(" "); // the input for skills will be like "1 3 5 6 8". Here, each number corresponds to some skill which will be added in the database. This is done for the purpose of testing because while testing through Postman, it is not possible to pass a body value as parameter where the content type of the body is 'x-www-form-urlencoded'

    authController.registerTeacher(name, username, email, password, contact, skills).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

// Route for logging in a student
router.post('/student/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    authController.loginStudent(email, password).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

// Route for logging in a teacher
router.post('/teacher/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    authController.loginTeacher(email, password).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;

