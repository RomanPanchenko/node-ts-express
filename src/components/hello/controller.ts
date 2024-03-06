import { Request, Response } from 'express';
import * as service from './service';
import { validateRequestQuery } from './validators';

export const getHello = async (req: Request, res: Response) => {
  const { query } = validateRequestQuery(req);
  const helloMessage = await service.getHello(query);

  return res.status(200).send(helloMessage);
};