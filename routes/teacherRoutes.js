/**
 * Created by Yash 1300 on 16-04-2018.
 */

const TeacherController = require('../controllers/teacherController');
const router = require('express').Router();

const secret = process.env.SECRET;

router.use((req, res, next) => {
    let token = req.headers['x-access-token'];
    TeacherController.verifyToken(token, secret).then(data => {
        req.decoded = data;
        next();
    }).catch(err => res.json(err));
});

router.get('/fetchDetails', (req, res) => {
    TeacherController.fetchDetails(req.decoded._id).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;