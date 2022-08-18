const joi = require('joi');

const userSchema = joi.object().keys({
    name: joi.required(),
    category_id: joi.integer(),
    image: joi.string(),
    link: joi.string(),
})

module.exports = userSchema;