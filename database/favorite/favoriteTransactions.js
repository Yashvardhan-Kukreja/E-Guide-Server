/**
 * Created by Yash 1300 on 22-05-2018.
 */

const Favorite = require('./favoriteModel');

const searchQuery = [
    {
        path: 'favoredByStudent',
        model: 'Student'
    },
    {
        path: 'favoriteTeacher',
        model: 'Teacher'
    },
    {
        path: 'skill',
        model: 'Skill'
    }
];

module.exports.findFavoriteById = (id, next) => {
    Favorite.findOne({_id: id}).populate(searchQuery).exec(next);
};

module.exports.addFavorite = (student_id, teacher_id, skill_id, next) => {
    let newFavorite = new Favorite({
        favoredByStudent: student_id,
        favoriteTeacher: teacher_id,
        skill: skill_id
    });
    newFavorite.save(next);
};

module.exports.removeFavorite = (student_id, teacher_id, skill_id, next) => {
    Favorite.findOneAndDelete({favoredByStudent: student_id, favoriteTeacher: teacher_id, skill: skill_id}).exec(next);
};

module.exports.findFavoritesForAStudent = (student_id, next) => {
    // TODO: Remove student ids from the next query
    Favorite.find({favoredByStudent: student_id}).populate(searchQuery).exec(next);
};

module.exports.findFavoredStudentsOfATeacher = (teacher_id, next) => {
    Favorite.find({favoriteTeacher: teacher_id}).populate(searchQuery).exec(next);
};