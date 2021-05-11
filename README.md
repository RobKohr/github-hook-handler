# github-hook-handler

Purpose: keep a production server up to date with a git repo branch. Ideal for react app builds, but really could be used for anything.

The config has a `cmd` property for each repo which allows you to set whatever deployment commands you want for each individual repo (or even each repo:branch)


* `npm install`
* `cp example.config.js local.config.js`
* Setup your git repo somewhere else on the server
* update the values in local.config.js
* Go to https://github.com/your/repo-url and click settings -> webhooks -> add webhook
* Set the payload url to be http://example.com:port/postPathFromConfig (post path should be unguessable)
* Just the push event, and then add webook
* `npm start` (or use forever or nodemon to keep it up in case of crash)
* Test by pushing up a commit to the main branch
* See the log at http://example.com.com:port
