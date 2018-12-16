var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const MapClass = require('./Map.js');
var Map = new MapClass();
const util = require('util');
var port = 8081;
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

server.lastPlayderID = 0;
server.lastEnemyID = 0;

server.listen(process.env.PORT || port, function () {
	console.log('Listening on ' + server.address().port);
});

var enemies = [
	{
		id: server.lastEnemyID++,
		x: 34 * Map.tileWidth,//randomInt(600, 900),
		y: 19 * Map.tileHeight,//randomInt(900, 1000),
		class: 'brainy',
		direction: 4,
		speed: 1
	},
	{
		id: server.lastEnemyID++,
		x: randomInt(600, 900),
		y: randomInt(900, 1000),
		class: 'skeleton',
		direction: 4,
		speed: 3
	},
	{
		id: server.lastEnemyID++,
		x: randomInt(600, 900),
		y: randomInt(900, 1000),
		class: 'zombie',
		direction: 4,
		speed: 6
	},
	{
		id: server.lastEnemyID++,
		x: randomInt(600, 900),
		y: randomInt(900, 1000),
		class: 'spider',
		direction: 4,
		speed: 3
	}
];

io.on('connection', function (socket) {
	socket.on('init', function (chosenClass) {
		console.log("Player with socketid: " + socket.id + " connected.")
		socket.emit('addPlayers', getAllPlayers());
		socket.player = {
			id: server.lastPlayderID++,
			x: randomInt(600, 900),
			y: randomInt(900, 1000),
			class: chosenClass,
		};
		socket.emit('addEnemies', enemies);
		socket.emit('addMainPlayer', socket.player);

		socket.broadcast.emit('addPlayer', socket.player);

		socket.on('move', function (data) {
			if (socket.player != undefined) {
				socket.player.x = data.x;
				socket.player.y = data.y;
				io.emit('movePlayer', socket.player);
			}
		});

		socket.on('disconnect', function () {
			console.log("Player with socketid: " + socket.id + " disconnected.");
			if (socket.player != undefined) {
				io.emit('removePlayer', socket.player.id);
			}
		});
	});
});
function getAllPlayers() {
	var players = [];
	Object.keys(io.sockets.connected).forEach(function (socketID) {
		var player = io.sockets.connected[socketID].player;
		if (player) players.push(player);
	});
	return players;
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

var counter = 0;
setInterval(function () {
	//console.log(counter++);
	//console.log(util.inspect(enemies, false, 3));
	enemies.forEach(function (enemy) {
		enemy.direction = randomInt(0, 5);
	});
}, 1000);
setInterval(function () {
	enemies.forEach(function (enemy) {
		if (enemy.direction == 0 && canWalkThere(enemy.x - enemy.speed - 16, enemy.y)) {//left
			enemy.x -= enemy.speed;
		}
		if (enemy.direction == 1 && canWalkThere(enemy.x + enemy.speed + 16, enemy.y)) {//right
			enemy.x += enemy.speed;
		}
		if (enemy.direction == 2 && canWalkThere(enemy.x, enemy.y - enemy.speed - 16)) {//up
			enemy.y -= enemy.speed;
		}
		if (enemy.direction == 3 && canWalkThere(enemy.x, enemy.y + enemy.speed + 16)) {//down
			enemy.y += enemy.speed;
		}
	});
	Object.keys(io.sockets.connected).forEach(function (socketId) {
		io.to(socketId).emit('enemyData', enemies);
	});
}, 20);

function canWalkThere(x, y) {
	return Map.isWalkable(Math.floor(x / Map.tileWidth), Math.floor(y / Map.tileHeight));
}