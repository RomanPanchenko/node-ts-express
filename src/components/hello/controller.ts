import { Request, Response } from 'express';
import * as service from './service';
import { validateRequestQuery } from './validators';

export const getHello = async (req: Request, res: Response) => {
  const { query } = validateRequestQuery(req);
  const helloMessage = await service.getHello(query);

  return res.status(200).send(helloMessage);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await service.getAllUsers();
  return res.status(200).json(result);
};

// TODO: CHeck user schema
export const addUser = async (req: Request, res: Response) => {
  await service.addUser(req.body);
  return res.status(200).send('User created');
};

export const fetchDistinctCountries = async (req: Request, res: Response) => {
  const result = await service.fetchDistinctCountries();
  return res.status(200).json(result);
};

export const getStats = async (req: Request, res: Response) => {
  const result = await service.getStats();
  return res.status(200).json(result);
};