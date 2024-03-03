import joi from 'joi';
import { Request } from 'express';
import { ValidationError } from '../../lib/errors';

const querySchema = joi.object({
  'user-name': joi.string().pattern(new RegExp('^[A-Z][a-z]{1,9}$')).required(),
});

export const validateRequestQuery = (req: Request) => {
  const { error, value } = querySchema.validate(req.query);

  if (error) {
    throw new ValidationError(error.details[0].message);
  }

  return { query: value };
};