import * as Joi from 'joi';
import validationErrorService from '../services/validationErrorService';

export default async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    weight: Joi.number().required(),
    height: Joi.number()
      .max(3)
      .required(),
    birthDate: Joi.date()
      .iso()
      .required(),
  });

  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json(validationErrorService(error));
  }

  return next();
};
