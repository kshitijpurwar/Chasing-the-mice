// Connect with server
const socket = io('http://localhost:8080');

const arrow = document.querySelector('.arrow');

function updateArrowPosition(coordinates) {
	arrow.style.left = `${coordinates.x}px`;
	arrow.style.top = `${coordinates.y}px`;
}

document.addEventListener('mousemove', (event) => {
	const coordinates = {
		x: event.clientX,
		y: event.clientY,
	};
	console.log('Mouse moved', coordinates);
	updateArrowPosition(coordinates);

	socket.emit('updatePostion', { x: coordinates.x, y: coordinates.y });
	console.log('Message sent through websockets');
});

socket.on('updatePostion', (data) => {
	console.log('From server', data);
	updateArrowPosition(data);
});

