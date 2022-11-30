/* eslint-disable prettier/prettier */
import Joi from '@hapi/joi';

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Descreption: Joi.string().required(),
    Color: Joi.string().optional(),
    userID: Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};