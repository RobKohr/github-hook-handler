const express = require('express')
const config = require('./local.config');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const logRecord = [`${(new Date()).toString()} server started`];
const log = (message, res)=>{
    console.log(message);
    logRecord.push(message);
    if(res){
	res.send(message);
    }
}

app.get('/', (req, res) => {
  res.send(`<html><body><pre>${logRecord.join('\n')}</pre></body></html>`)
})



app.post(`/${config.postPath}`, (req, res) => {
    
    try{
	console.log(JSON.stringify(JSON.parse(req.body.payload), 0, 5));
	const payload = JSON.parse(req.body.payload);
	const messages = payload.commits.map(({message})=>message).join('; ');
	const name = payload.repository.name;
	const branch = payload.ref.replace('refs/heads/', '')
	
	const cmd = config[name+':'+branch]?.cmd;
	if(cmd){
	    log(`${(new Date()).toString()} - deploying repo update for ${name} branch ${branch} - messages: ${messages}`);
	}else{
	    return log(`${(new Date()).toString()} - ERROR: command not found for ${name} branch ${branch} - messages: ${messages}`, res);
	}
	exec(cmd, (error, stdout, stderr) => {
	    if (error) {
		log(`error: ${error.message}`, res);
		res.sendStatus(500);
		return;
	    }
	    if (stderr) {
		log(`stderr: ${stderr}`, res);
		res.sendStatus(500);
		return;
	    }
	    log(`stdout: ${stdout}`, res);
	    return res.sendStatus(200);
	});


    }catch(e){
	log(e.toString());
	res.sendStatus(500);
    }
})

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`)
})
