import * as path from 'path';
import { FileService } from '../../lib/fileService';

const FILE_PATH = path.join(process.cwd(), '/data/user-collection.json');
let userId: number;

const getUserId = (users: any) => {
  if (!userId) {
    let max = 0;

    for (let i = 0; i < users.length; i++) {
      if (users[i].id > max) max = users[i].id;
    }

    max++;
    userId = max;
  } else {
    userId++;
  }

  return userId;
};

export const getHello = async (query: any): Promise<string> => {
  const name = query['user-name'];

  return `Hello ${name}!`;
};

export const getAllUsers = async () => {
  const users = await FileService.readFile(FILE_PATH);
  return users;
};

export const addUser = async (userObj: object) => {
  const users = await FileService.readFile(FILE_PATH);
  const user = Object.assign({}, userObj, { id: getUserId(users) });
  users.push(user);
  await FileService.writeFile(FILE_PATH, JSON.stringify(users));
};

export const fetchDistinctCountries = async () => {
  const users = await FileService.readFile(FILE_PATH);
  const countries: any = {};
  users.forEach((user: any) => {
    if (!(user.country in countries)) {
      countries[user.country] = 0;
    }

    countries[user.country]++;
  });

  return countries;
};

export const getStats = async () => {
  const users = await FileService.readFile(FILE_PATH);
  const countries: any = {};
  const stats: any = {};

  users.forEach((user: any) => {
    if (!(user.country in countries)) {
      countries[user.country] = [];
    }

    countries[user.country].push(user);
  });

  Object.keys(countries).forEach(key => {
    countries[key].sort((u1: any, u2: any) => {
      const u1e = Number(u1.earnings.replace('$', ''));
      const u2e = Number(u2.earnings.replace('$', ''));
      return u2e - u1e;
    });

    countries[key].splice(10);

    let sum = 0;
    for (let i = 0; i < countries[key].length; i++) {
      sum += Number(countries[key][i].earnings.replace('$', ''));
    }

    stats[key] = sum / countries[key].length;
  });

  return stats;
};



