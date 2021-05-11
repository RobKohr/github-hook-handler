module.exports ={
    postPath: 'someMadeupRandomString', 
    'repo-name-on-github:main': {
	cmd:'cd /path/to/project-directory; git pull; npm install; npm run build',
	notes:'Install and build the newest update'
    },
    'some-other-repo-name-on-github:weird-branch-name': {
	cmd:'cd /path/to/project-directory2; git pull; npm install; npm run build',
	notes:'Put whatevery you want to say about this here'
    },
    port: 3187
}
