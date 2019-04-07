/**
 * @format
 */

import outputFile from "../tools/outputFile";
import logger from '../tools/logger';

const run = async () => {
  logger.debug('Loading previously parsed data');
  const data: any[] = await outputFile.load("parsed.json")
  logger.debug('Loading previously parsed data successful');

  logger.debug('Mapping data to rows');
  const rows = data.map(repo => `
  <tr>
  <td><a href="https://github.com/react-native-community/${repo.name}"><pre>${repo.name}</pre></a></td>
  <td>${repo.features.communityEslint ? "✅" : "❌"}</td>
  <td>${repo.features.mitLicense ? "✅" : "❌"}</td>
  </tr>
  `)
  const rowsHtml = rows.join("\n");
  logger.debug('Mapping data to rows successful');
  
  logger.debug('Generating HTML');
  const html = `
  <html>
  <head>
  <meta charset="UTF-8">
  </head>
  <body>
  <table>
  <tr>
  <th>Name</th>
  <th>Community ESLint</th>
  <th>MIT Licence</th>
  </tr>
  ${rowsHtml}
  </table>
  </body>
  </html>
  `
  logger.debug('Generating HTML successful');
  
  logger.debug('Saving HTML to index.html');
  await outputFile.save("index.html", html);
  logger.info('Saving HTML to index.html successful');
}

run();