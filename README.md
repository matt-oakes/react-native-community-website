# Proof-of-concept React Native Community Website

→ [Live website](https://matt-oakes.github.io/react-native-community-website/) ←

This is a simple proof of concept for a website for the [React Native Community](https://github.com/react-native-community). The idea is to test out some ideas I had for the website and get some feedback on it.

Currently, the website is a simple list of all of the repositories in the Github org, with links, some basic stats, and how well they confirm to the [standards](https://github.com/react-native-community/meta).

This website is automatically generated and updated by CircleCI every day so it should always be up-to-date.

## Current features

* Pulls data from the Github API to display repo names and star counts.
* Analyses the `package.json`'s `devDependencies` to check if it uses the `@react-native-community/eslint-config`.
* Checks that Github is detecting that the licence is MIT.
* Is rebuilt every day by CircleCI with the latest data to avoid the need to maintain it.
* Published on Github pages to avoid hosting issues.

# Future featues

* Make it less ugly.
* Make this website more useful for users to React Native to find packages.
* Make the website more than just a table, with information about what the community is and why it exists.
* Display the maintainers and contributors along with each repo to make it clear who's helping in the community.
