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

server.lastPlayerID = 0;
server.lastEnemyID = 0;
server.lastProjectilleID = 0;

server.listen(process.env.PORT || port, function () {
	console.log('Listening on ' + server.address().port);
});

var enemies = [
	{
		id: server.lastEnemyID++,
		x: randomInt(93 * Map.tileWidth, 95 * Map.tileWidth),
		y: randomInt(12 * Map.tileHeight, 26 * Map.tileHeight),
		class: 'brainy',
		direction: 4,
		speed: 2,
		aggresive: true,
		isBoss: false
	},
	{
		id: server.lastEnemyID++,
		x: randomInt(93 * Map.tileWidth, 95 * Map.tileWidth),
		y: randomInt(12 * Map.tileHeight, 26 * Map.tileHeight),
		class: 'skeleton',
		direction: 4,
		speed: 1,
		aggresive: true,
		isBoss: false
	},
	{
		id: server.lastEnemyID++,
		x: randomInt(93 * Map.tileWidth, 95 * Map.tileWidth),
		y: randomInt(12 * Map.tileHeight, 26 * Map.tileHeight),
		class: 'skeleton',
		direction: 4,
		speed: 1,
		aggresive: true,
		isBoss: false
	},
	{
		id: server.lastEnemyID++,
		x: 86 * Map.tileWidth,
		y: 23 * Map.tileHeight,
		class: 'zombie',
		direction: 4,
		speed: 0.8,
		aggresive: true,
		isBoss: false
	},
	{
		id: server.lastEnemyID++,
		x: 6 * Map.tileWidth,
		y: 28 * Map.tileHeight,
		class: 'white cat',
		direction: 4,
		speed: 1.5,
		aggresive: false,
		isBoss: false
	},
	{
		id: server.lastEnemyID++,
		x: 33 * Map.tileWidth,
		y: 17 * Map.tileHeight,
		class: 'dog',
		direction: 4,
		speed: 1.1,
		aggresive: false,
		isBoss: false
	},
	{
		id: server.lastEnemyID++,
		x: 48 * Map.tileWidth,
		y: 16 * Map.tileHeight,
		class: 'black cat',
		direction: 4,
		speed: 1.5,
		aggresive: false,
		isBoss: false
	},
	{
		id: server.lastEnemyID++,
		x: 145 * Map.tileWidth,
		y: 16 * Map.tileHeight,
		class: 'dragon',
		direction: 4,
		speed: 0,
		aggresive: true,
		isBoss: true
	},
];

var players = {};
var projectilles = [];

io.on('connection', function (socket) {
	socket.on('init', function (chosenClass) {
		console.log("Player with socketid: " + socket.id + " connected.")
		socket.emit('addPlayers', getAllPlayers());
		socket.playerID = server.lastPlayerID++;
		var player = {
			id: socket.playerID,
			//x: randomInt(18 * Map.tileWidth, 24 * Map.tileWidth),
			//y: 30 * Map.tileHeight,
			x: 140 * Map.tileWidth,
			y: 16 * Map.tileHeight,
			class: chosenClass,
			maxHp: 100,
			hp: 100,
		};
		players[socket.playerID] = player;
		socket.emit('addEnemies', enemies);
		socket.emit('addMainPlayer', players[socket.playerID]);
		socket.broadcast.emit('addPlayer', players[socket.playerID]);

		socket.on('move', function (data) {
			if (socket.playerID != undefined) {
				if (isTeleportingToDung(data.x, data.y)) {
					players[socket.playerID].x = 94.5 * Map.tileWidth;
					players[socket.playerID].y = 30 * Map.tileHeight;
					io.emit('forceMovePlayer', players[socket.playerID]);
				} else if (isTeleportingToTown(data.x, data.y)) {
					players[socket.playerID].x = 19.5 * Map.tileWidth;
					players[socket.playerID].y = 3 * Map.tileHeight;
					io.emit('forceMovePlayer', players[socket.playerID]);
				} else if (isTeleportingToDungLadder(data.x, data.y)) {
					players[socket.playerID].x = 86.5 * Map.tileWidth;
					players[socket.playerID].y = 24 * Map.tileHeight;
					io.emit('forceMovePlayer', players[socket.playerID]);
				} else if (isTeleportingToBossRoom(data.x, data.y)) {
					players[socket.playerID].x = 136.5 * Map.tileWidth;
					players[socket.playerID].y = 8 * Map.tileHeight;
					io.emit('forceMovePlayer', players[socket.playerID]);
				}
				else {
					players[socket.playerID].x = data.x;
					players[socket.playerID].y = data.y;
				}
			}
		});

		socket.on('disconnect', function () {
			console.log("Player with socketid: " + socket.id + " disconnected.");
			if (socket.playerID != undefined) {
				delete players[socket.playerID];
				io.emit('removePlayer', socket.playerID);
			}
		});
	});
});

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

setInterval(function () {
	for (i = 0; i < projectilles.length; i++) {
		projectilles.splice(i, 1);
		i--;
	}
	var rand = randomInt(0, 360);
	projectilles.push(
		{
			id: server.lastProjectilleID++,
			x: 145 * Map.tileWidth,
			y: 16 * Map.tileHeight,
			class: 'fireball',
			rotation: (0 + rand) * Math.PI / 180,
			speed: 2,
		},
		{
			id: server.lastProjectilleID++,
			x: 145 * Map.tileWidth,
			y: 16 * Map.tileHeight,
			class: 'fireball',
			rotation: (90 + rand) * Math.PI / 180,
			speed: 2,
		},
		{
			id: server.lastProjectilleID++,
			x: 145 * Map.tileWidth,
			y: 16 * Map.tileHeight,
			class: 'fireball',
			rotation: (180 + rand) * Math.PI / 180,
			speed: 2,
		},
		{
			id: server.lastProjectilleID++,
			x: 145 * Map.tileWidth,
			y: 16 * Map.tileHeight,
			class: 'fireball',
			rotation: (270 + rand) * Math.PI / 180,
			speed: 2,
		},
		{
			id: server.lastProjectilleID++,
			x: 145 * Map.tileWidth,
			y: 16 * Map.tileHeight,
			class: 'fireball',
			rotation: (315 + rand) * Math.PI / 180,
			speed: 2,
		});

}, 3000);

var counter = 0;
setInterval(function () {
	//console.log(counter++);
	//console.log(util.inspect(projectilles, false, 3));
	enemies.forEach(function (enemy) {
		enemy.direction = randomInt(0, 4);
	});
}, 1000);
setInterval(function () {
	for (var i = 0; i < projectilles.length; i++) {
		var projectille = projectilles[i];
		projectille.x += projectille.speed * Math.cos(projectille.rotation);
		projectille.y += projectille.speed * Math.sin(projectille.rotation);
		let id;
		for (id in players) {
			if (areColliding(players[id], projectille, 20)) {
				players[id].hp -= 20;
				projectilles.splice(i, 1);
				i--;
				break;
			}
		}
	}

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
	var playersArr = getAllPlayers();
	Object.keys(io.sockets.connected).forEach(function (socketId) {
		io.to(socketId).emit('update', enemies, playersArr, projectilles);
	});
}, 20);

function canWalkThere(x, y) {
	return Map.isWalkable(Math.floor(x / Map.tileWidth), Math.floor(y / Map.tileHeight));
}
function isTeleportingToDung(x, y) {
	return Math.floor(x / Map.tileWidth) == 19 && Math.floor(y / Map.tileHeight) == 2;
}
function isTeleportingToTown(x, y) {
	return Math.floor(x / Map.tileWidth) == 94 && Math.floor(y / Map.tileHeight) == 31;
}
function isTeleportingToDungLadder(x, y) {
	return Math.floor(x / Map.tileWidth) == 136 && Math.floor(y / Map.tileHeight) == 7;
}
function isTeleportingToBossRoom(x, y) {
	return Math.floor(x / Map.tileWidth) == 86 && Math.floor(y / Map.tileHeight) == 25;
}
function getAllPlayers() {
	var playersArr = [];
	Object.keys(players).forEach(function (socketID) {
		var player = players[socketID];
		if (player) playersArr.push(player);
	});
	return playersArr;
}
function areColliding(a, b, size) {
	return Math.hypot(a.x - b.x, a.y - b.y) < size;
}