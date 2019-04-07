import graphqlQuery from "./graphqlQuery";

const run = async () => {
  const results = [];

  let endCursor: string | null = null;
  do {
    const json = await graphqlQuery(endCursor);
    const { repositories } = json.data.organization;
    results.push(...repositories.nodes);
    const { pageInfo } = repositories;
    endCursor = pageInfo.endCursor;
    console.log("endCursor", endCursor)
  } while (endCursor != null)

  console.log("Count", results.length)
};

run();