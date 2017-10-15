let express = require("express");
let socket = require("socket.io");

// App Setup
const app = express();
const server = app.listen(8080, function(){
	console.log('Listening to requests on port - 8080');
});

app.use(express.static('public'));

//  Socket App
const io = socket(server);

let connected = 0;
io.on('connection', function(socket){
	console.log('Someone connected through sockets');
	console.log('Total Connected clients', connected++);

	socket.on('updatePostion', function(data){
		console.log('Someone just updated the position of arrow to', data.x, data.y);
		socket.broadcast.emit('updatePostion', data);
	});

	socket.on('disconnect', function(){
		console.log('Someone just left');
		console.log('Total Connected clients', connected--);
	});
});

