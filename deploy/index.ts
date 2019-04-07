/**
 * @format
 */

import * as ghpages from 'gh-pages';

const run = async () => {
  await new Promise((resolve, reject) => {
    ghpages.publish(
      'output',
      {
        repo:
          'https://' +
          process.env.GH_TOKEN +
          '@github.com/matt-oakes/react-native-community-website.git',
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};

run();
