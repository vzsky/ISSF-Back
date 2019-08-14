const Joi = require('@hapi/joi');

const allProjectBranch = ['BIO', 'CHE', 'PHY', 'MAT'];

const RegistValidate = (data) => {
    let Schema = {
        username : Joi.string().min(4).required().lowercase(),
        password : Joi.string().min(6).required(),
        permission : Joi.number().integer().min(0).max(2),
        name : Joi.string().required(),
        school : Joi.string().required(),
        country : Joi.string().required(),
        email : Joi.string().email(),
        project : Joi.any(),
    };
    let Validation = Joi.validate(data, Schema);
    return Validation;
};

const LoginValidate = (data) => {
    let Schema = {
        username : Joi.string().min(4).required().lowercase(),
        password : Joi.string().min(6).required(),
    };
    let Validation = Joi.validate(data, Schema);
    return Validation;
};

const ProjectValidate = (data) => {
    data.branch = data.branch.toUpperCase();
    let Schema = {
        name : Joi.string().required(),
        branch : Joi.string().valid(allProjectBranch).required(),
        code : Joi.string().lowercase().required(),
    }
    let Validation = Joi.validate(data, Schema);
    return Validation;
}

module.exports.RegistValidate = RegistValidate;
module.exports.LoginValidate = LoginValidate;
module.exports.ProjectValidate = ProjectValidate;