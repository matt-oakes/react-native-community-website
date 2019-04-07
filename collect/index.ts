/**
 * @format
 */

import graphqlQuery from './graphqlQuery';
import logger from '../tools/logger';
import outputFile from '../tools/outputFile';

const run = async () => {
  const results = [];

  logger.debug('Collecting data from GraphQL');
  let endCursor: string | null = null;
  do {
    logger.debug(`Getting results after end cursor ${endCursor}`);

    const json = await graphqlQuery(endCursor);

    const {repositories} = json.data.organization;
    results.push(...repositories.nodes);

    const {pageInfo} = repositories;
    endCursor = pageInfo.endCursor;

    logger.debug(
      `Got page with ${
        repositories.nodes.length
      } new items endCursor ${endCursor}`,
    );
  } while (endCursor != null);

  logger.debug(`Finished fetching ${results.length} results`);

  logger.debug('Saving to collected.json');
  await outputFile.save('collected.json', JSON.stringify(results));
  logger.info('Saved to collected.json');
};

run();
