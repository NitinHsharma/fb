const express = require(‘express’);
const app = express();
const FBBotFramework = require(‘fb - bot - framework’);
const data = require('./config.json')
	// Initialize
const bot = new FBBotFramework({
	data
});

// Setup Express middleware for /webhook
		app.use(‘/webhook’, bot.middleware());
		// parse application/json
		app.use(bodyParser.json())

		// Setup listener for incoming messages
		bot.on(‘message’, (userId, message) => {
			bot.sendTextMessage(userId, 'Echo Message: ' + message);
		});


		app.get('/', (req, res) => {
			res.send(“hello world”);
		});

		//Make Express listening
		app.listen(process.env.port || 3000);