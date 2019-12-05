import * as Joi from 'joi';
import validationErrorService from '../services/validationErrorService';

export default async (req, res, next) => {
  const schema = Joi.object().keys({
    question: Joi.string().required(),
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    return res.status(400).json(validationErrorService(error));
  }

  return next();
};
