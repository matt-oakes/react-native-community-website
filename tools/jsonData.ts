/**
 * @format
 */

import fs from 'fs';

export const load = async (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
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

export const save = async (filePath: string, json: object) => {
  await new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(json), err => {
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
