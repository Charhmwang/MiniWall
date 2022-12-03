const joi = require('joi')

const registerValidation = (data) => {
    const schemaValidation = joi.object({
        Username:joi.string().required().min(3).max(256),
        Email:joi.string().required().min(6).max(256).email(),
        Password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => {
    const schemaValidation = joi.object({
        Email:joi.string().required().min(6).max(256).email(),
        Password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation