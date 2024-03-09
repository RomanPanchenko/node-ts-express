import { promises as fs } from 'fs';

export class FileService {
  static async readFile(path: string) {
    const fileContent = await fs.readFile(path, 'utf8');
    let json;
    try {
      json = JSON.parse(fileContent);
      return json;
    } catch (e) {
      throw new Error('Cannot parse file content');
    }
  }

  static async writeFile(path: string, data: string) {
    await fs.writeFile(path, data);
  }
}