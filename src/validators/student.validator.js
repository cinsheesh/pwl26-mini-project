
import Joi from 'joi';

export const skemaStudent = Joi.object({
    nim: Joi.string().length(9).required(),
    name: Joi.string().min(3).max(100).required(),
    major: Joi.string().min(3).max(100).required(),
    gpa: Joi.number().min(0).max(4).default(0),
    birthdate: Joi.date().iso().required()
});
