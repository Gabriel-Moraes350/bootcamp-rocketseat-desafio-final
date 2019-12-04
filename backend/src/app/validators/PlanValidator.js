import * as Joi from 'joi';
import validationErrorService from '../services/validationErrorService';

export default async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    duration: Joi.number()
      .max(12)
      .positive()
      .required(),
    price: Joi.number().required(),
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    return res.status(400).json(validationErrorService(error));
  }

  return next();
};
