import path = require("path");
import logger from "../tools/logger"
import jsonData from "../tools/jsonData";

const run = async () => {
  const results = [];

  logger.debug("Loading previously collected data")
  const inputFilePath = path.join(__dirname, "..", "collect-data", "collected.json")
  let data: any = await jsonData.load(inputFilePath);
  logger.debug("Loading previously collected data successful")

  logger.debug("Collapse topics to a simple array")
  data = data.map(repo => {
    return {
      ...repo,
      repositoryTopics: repo.repositoryTopics.nodes.map(topic => topic.topic.name)
    }
  })
  logger.debug("Collapse topics to a simple array successful")
  
  logger.debug("Parsing the package.json contents")
  data = data.map(repo => {
    let packagejson = null;
    if (repo.packagejson && repo.packagejson.text) {
      packagejson = JSON.parse(repo.packagejson.text)
    }
    return {
      ...repo,
      packagejson
    }
  })
  logger.debug("Parsing the package.json contents successful")

  logger.debug("Collect the data into the bits we actually care about")
  data = data.map(repo => {
    const hasCommunityEslint = !!(repo.packagejson && repo.packagejson.devDependencies && repo.packagejson.devDependencies["@react-native-community/eslint-config"])
    const usesMitLicense = !!(repo.licenseInfo && repo.licenseInfo.key === "mit")

    return {
      name: repo.name,
      topics: repo.repositoryTopics,
      stars: repo.stargazers.totalCount,
      features: {
        communityEslint: hasCommunityEslint,
        mitLicense: usesMitLicense
      }
    }
  })
  logger.debug("Collect the data into the bits we actually care about successful")

  logger.debug("Saving to parsed.json")
  const outputFilePath = path.join(__dirname, "parsed.json")
  await jsonData.save(outputFilePath, data);
  logger.info("Saved to parsed.json")
};

run();