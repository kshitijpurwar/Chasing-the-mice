const express = require('express');
const socketio = require('socket.io');

// App Setup
const app = express();
const server = app.listen(8080, () => {
	console.log('Listening to requests on port - 8080');
});

app.use(express.static('public'));

//  Socket App
const io = socketio(server);

let connected = 0;
io.on('connection', (socket) => {
	console.log('Someone connected through sockets');
	connected += 1;
	console.log('Total Connected clients', connected);

	socket.on('updatePostion', (data) => {
		console.log('Someone just updated the position of arrow to', data.x, data.y);
		socket.broadcast.emit('updatePostion', data);
	});

	socket.on('disconnect', () => {
		console.log('Someone just left');
		connected -= 1;
		console.log('Total Connected clients', connected);
	});
});
