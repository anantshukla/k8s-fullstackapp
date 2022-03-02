const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: '*',
	},
	path: '/rt/socket.io'
});


io.on('connection', (socket) => {
	console.log('Client connected');

	// Disconnect listener
	socket.on('disconnect', function () {
		console.log('Client disconnected.');
	});
});

server.listen(3002, () => {
	console.log('Socket Service is running on: 3002');
});

app.get("/socket", (req, res) => {
	res.status(200).json("Server is running successfully!");
});

const publishMessageToSocket = () => {
	const messageToSend = JSON.stringify({ message: (Math.random() + 1).toString(36).substring(7) });
	io.emit('someRandomMessageTopic', messageToSend);
	console.log('Message Published');
}

setInterval(() => {
	publishMessageToSocket();
}, 3000)
