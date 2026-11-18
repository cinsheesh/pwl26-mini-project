import Joi from 'joi';

export const skemaScore = Joi.object({
    studentId: Joi.number().integer().positive().required(),
    course: Joi.string().min(3).max(100).required(),
    score: Joi.number().min(0).max(100).required()
});
