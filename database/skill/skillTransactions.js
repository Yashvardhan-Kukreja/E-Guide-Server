/**
 * Created by Yash 1300 on 25-05-2018.
 */

const Skill = require('./skillModel');

module.exports.fetchAllSkills = (next) => {
    Skill.find({}).exec(next);
};

module.exports.addASkill = (skill, next) => {
    let newSkill = new Skill({
        name: skill
    });

    newSkill.save(next);
};