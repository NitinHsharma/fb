const express = require('express');
const app = express();
const FBBotFramework = require('fb-bot-framework');
const bodyParser = require('body-parser')


console.log('pageToken',process.env.pageToken);
console.log('verifyToken',process.env.verifyToken);
// Initialize
const bot = new FBBotFramework({
	"page_token": process.env.pageToken,
	"verify_token": process.env.verifyToken
});

console.log('pass');
// Setup Express middleware for /webhook
app.use('/webhook', bot.middleware());
// parse application/json
app.use(bodyParser.json())
var users = [];
// Setup listener for incoming messages
bot.on('message', (userId, message) => {
	if (message.indexOf('me:') == 0) {
		let user = message.split(':');
		users.push({
			username: user[1],
			userId: userId
		})
	}
	var sender = users.filter(x => x.userId == userId);
	users.forEach(element => {
		if (element.userId != userId) {
			bot.sendTextMessage(element.userId, sender[0].username + ' Said: ' + message);
		}
	})
});
app.get('/', (req, res) => {
	res.send('hello world');
});
var server = app.listen(process.env.PORT || 5000, function() {
	var host = server.address().address
	var port = server.address().port
})

