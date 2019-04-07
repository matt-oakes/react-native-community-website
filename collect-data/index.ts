import fs = require("fs");
import path = require("path");
import graphqlQuery from "./graphqlQuery";
import logger from "../tools/logger"

const run = async () => {
  const results = [];

  logger.debug("Collecting data from GraphQL")
  let endCursor: string | null = null;
  do {
    logger.debug(`Getting results after end cursor ${endCursor}`)
    
    const json = await graphqlQuery(endCursor);
    
    const { repositories } = json.data.organization;
    results.push(...repositories.nodes);
    
    const { pageInfo } = repositories;
    endCursor = pageInfo.endCursor;
    
    logger.debug(`Got page with ${repositories.nodes.length} new items endCursor ${endCursor}`)
  } while (endCursor != null)

  logger.info(`Finished fetching ${results.length} results`)

  logger.debug("Saving to collected.json")
  await new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, "collected.json"), JSON.stringify(results), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
  logger.debug("Saved to collected.json")
};

run();