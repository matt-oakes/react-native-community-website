import fetch from "node-fetch";

export default async function graphqlQuery(after: string | null = null) {
  const query = {
    query: `{
      organization(login: "react-native-community") {
        repositories(first: 20 ${after ? `after: ${after}` : ""}) {
          totalCount
          pageInfo {
            endCursor
            startCursor
          }
          nodes {
            id
            name
            licenseInfo {
              key
            }
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
            packagejson: object(expression: "master:package.json") {
              ... on Blob {
                text
              }
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }`
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GH_TOKEN}`
    },
    body: JSON.stringify(query)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Got an error from the Github API: ${text}`)
  }

  return await response.json();
}
