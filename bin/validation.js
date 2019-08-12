const Joi = require('@hapi/joi');

const RegistValidate = (data) => {
    let Schema = {
        username : Joi.string().min(4).required(),
        password : Joi.string().min(6).required(),
        permission : Joi.number().integer().min(0).max(2)
    };
    let Validation = Joi.validate(data, Schema);
    return Validation;
};

const LoginValidate = (data) => {
    let Schema = {
        username : Joi.string().min(4).required(),
        password : Joi.string().min(6).required(),
    };
    let Validation = Joi.validate(data, Schema);
    return Validation;
};

module.exports.RegistValidate = RegistValidate;
module.exports.LoginValidate = LoginValidate;