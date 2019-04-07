/**
 * @format
 */

import * as fs from 'fs';
import * as path from 'path';

const folderPath = path.join(__dirname, '..', 'output');

const filePath = (fileName: string): string => {
  return path.join(folderPath, fileName);
};

export const load = async (fileName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath(fileName), (err, data) => {
      if (err) {
        reject(err);
      } else {
        const dataString = data.toString('UTF8');
        const json = JSON.parse(dataString);
        resolve(json);
      }
    });
  });
};

export const save = async (fileName: string, data: any) => {
  await new Promise((resolve, reject) => {
    fs.exists(folderPath, exists => {
      if (exists) {
        resolve();
      } else {
        fs.mkdir(folderPath, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });

  await new Promise((resolve, reject) => {
    fs.writeFile(filePath(fileName), data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export default {
  load,
  save,
};
