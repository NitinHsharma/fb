const express = require('express');
const app = express();
const FBBotFramework = require('fb-bot-framework');
const data = require('./config.json');
const bodyParser = require('body-parser')

console.log(data);
// Initialize
const bot = new FBBotFramework(data);

// Setup Express middleware for /webhook
app.use('/webhook', bot.middleware());
// parse application/json
app.use(bodyParser.json())

var usersId = [];
// Setup listener for incoming messages
bot.on('message', (userId, message) => {
	console.log('msg came from ', userId, message);
	if (message.indexOf('me:') == 0) {
		let user = message.split(':');
		userId.push({
			username : user[1],
			userId : userId
		})
	}


	usersId.forEach(element => {
		console.log('array is ', element);
		bot.sendTextMessage(element.userId, element.username + ' Said: ' + message);
		console.log('msg sent to ', element.userId);
	})
});



app.get('/', (req, res) => {
	console.log('request came');
	res.send('hello world');
});



var server = app.listen(process.env.PORT || 5000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)
})