# github-hook-handler

This will run on the same server as your production repo. When a push happens on github, this
will run terminal commands, with the goal of updating your repo to the latest from github. 


* `npm install`
* `cp example.config.js local.config.js`
* Setup your git repo somewhere else on the server
* update the values in local.config.js
* Go to https://github.com/your/repo-url and click settings -> webhooks -> add webhook
* Set the payload url to be http://github-hook-handler-server-url.com:port/postPathFromConfig
* Just the push event, and then add webook
* `node server.js` (or use forever or nodemon to keep it up in case of crash)
* Test by pushing up a commit to the main branch
* See the log at http://github-hook-handler-server-url.com:port
