# 🚀 Simple Instagram home page 🚀

This project's purpose is to show the code to Berkeley Assets technical team. It's a simple page representing Instagram home page built with React.

## What is inside?
* Redux
* API integration
    * On page reload, get user token
    * Fetching all the posts of the current login user
* Responsive UI(mobile/desktop)
  * Top nav bar
  * Feed
  * Bottom nav bar(only on mobile)
* Unit Test above 80%
* CI
    * Conformity check(eslint and prettier)
    * Unit test(80% coverage mininum to passe the pipeline)
* CD
    * Automatically deploy on merge in master/main branch
    
## How it work?
* Run
    * `yarn`
    * `yarn dev`
* Test
    * `yarn test:cov`
* Lint
    * `yarn eslint:check` or `yarn prettier:check`
    * `yarn eslint:fix` or `yarn prettier:fix`
    * `yarn lint:check` or `yarn lint:fix`
