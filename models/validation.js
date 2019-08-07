const Joi = require('@hapi/joi');

const JoiSchema = {
    username : Joi.string().min(4).required(),
    password : Joi.string().min(6).required(),
};

const RegistValidate = (data) => {
    let Validation = Joi.validate(data, JoiSchema);
    return Validation;
};

const LoginValidate = (data) => {
    let Validation = Joi.validate(data, JoiSchema);
    return Validation;
};

module.exports.RegistValidate = RegistValidate;
module.exports.LoginValidate = LoginValidate;