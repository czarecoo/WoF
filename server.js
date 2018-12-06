var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port = 8081;
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || port, function () {
	console.log('Listening on ' + server.address().port);
});

io.on('connection', function (socket) {
	console.log("Player with socketid: " + socket.id + " connected.")
	socket.on('disconnect', function () {
		console.log("Player with socketid: " + socket.id + " disconnected.")
	});
});
