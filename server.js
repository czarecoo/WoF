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
		speed: 10,
		aggresive: true,
		isBoss: false,
		maxHp: 50,
		hp: 50,
		isAttacking: false
	},
	{
		id: server.lastEnemyID++,
		x: randomInt(93 * Map.tileWidth, 95 * Map.tileWidth),
		y: randomInt(12 * Map.tileHeight, 26 * Map.tileHeight),
		class: 'skeleton',
		direction: 4,
		speed: 5,
		aggresive: true,
		isBoss: false,
		maxHp: 100,
		hp: 100,
		isAttacking: false
	},
	{
		id: server.lastEnemyID++,
		x: randomInt(93 * Map.tileWidth, 95 * Map.tileWidth),
		y: randomInt(12 * Map.tileHeight, 26 * Map.tileHeight),
		class: 'skeleton',
		direction: 4,
		speed: 5,
		aggresive: true,
		isBoss: false,
		maxHp: 100,
		hp: 100,
		isAttacking: false
	},
	{
		id: server.lastEnemyID++,
		x: 86 * Map.tileWidth,
		y: 23 * Map.tileHeight,
		class: 'zombie',
		direction: 4,
		speed: 4,
		aggresive: true,
		isBoss: false,
		maxHp: 200,
		hp: 200,
		isAttacking: false
	},
	{
		id: server.lastEnemyID++,
		x: 6 * Map.tileWidth,
		y: 28 * Map.tileHeight,
		class: 'white cat',
		direction: 4,
		speed: 8,
		aggresive: false,
		isBoss: false,
		maxHp: 1,
		hp: 1,
		isAttacking: false
	},
	{
		id: server.lastEnemyID++,
		x: 33 * Map.tileWidth,
		y: 17 * Map.tileHeight,
		class: 'dog',
		direction: 4,
		speed: 6,
		aggresive: false,
		isBoss: false,
		maxHp: 1,
		hp: 1,
		isAttacking: false
	},
	{
		id: server.lastEnemyID++,
		x: 48 * Map.tileWidth,
		y: 16 * Map.tileHeight,
		class: 'black cat',
		direction: 4,
		speed: 7.5,
		aggresive: false,
		isBoss: false,
		maxHp: 1,
		hp: 1,
		isAttacking: false
	}
];
var boss = {
	id: server.lastEnemyID++,
	x: 146 * Map.tileWidth,
	y: 17 * Map.tileHeight,
	class: 'dragon',
	direction: 4,
	speed: 0,
	aggresive: true,
	isBoss: true,
	maxHp: 5000,
	hp: 5000,
	isAttacking: false
};
enemies.push(boss);
var players = {};
var projectilles = [];
var items = [];

io.on('connection', function (socket) {
	socket.on('init', function (chosenClass) {
		console.log("Player with socketid: " + socket.id + " connected.")
		socket.emit('addItems', items);
		socket.emit('addPlayers', getAllPlayers());
		socket.playerID = server.lastPlayerID++;
		var player = {
			id: socket.playerID,
			x: randomInt(18 * Map.tileWidth, 24 * Map.tileWidth),
			y: 30 * Map.tileHeight,
			//x: 140 * Map.tileWidth,
			//y: 16 * Map.tileHeight,
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
		socket.on('shoot', function (projectille) {
			projectille.id = server.lastProjectilleID++;
			projectille.isPlayerParent = true;
			projectilles.push(projectille);
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



var counter = 0;
setInterval(function () {
	//console.log(counter++);
	//console.log(util.inspect(projectilles, false, 3));
	//console.log(projectilles.length);
	enemies.forEach(function (enemy) {
		if (enemy.hp <= 0) {
			enemy.direction = -1;
		} else {
			if (!enemy.isAttacking) {
				if (randomInt(1, 99) > 50) {
					enemy.direction = randomInt(0, 4);
				}
			}
		}
	});
}, 500);
setInterval(function () {
	for (i = 0; i < projectilles.length; i++) {
		if (!canWalkThere(projectilles[i].x, projectilles[i].y)) {
			projectilles.splice(i, 1);
			i--;
		}
	}
	for (var i = 0; i < projectilles.length; i++) {
		var projectille = projectilles[i];
		projectille.x += projectille.speed * Math.cos(projectille.rotation);
		projectille.y += projectille.speed * Math.sin(projectille.rotation);
		let id;
		for (id in players) {
			if (areColliding(players[id], projectille, projectille.size) && !projectille.isPlayerParent) {
				players[id].hp -= projectille.damage;
				if (players[id].hp <= 0) {
					players[id].hp = 0
					items.push({ x: players[id].x, y: players[id].y, class: 'deadplayer' });
				} else {
					projectilles.splice(i, 1);
					i--;
				}
				break;
			}
		}
		for (var j = 0; j < enemies.length; j++) {
			if (areColliding(enemies[j], projectille, projectille.size) && projectille.isPlayerParent) {
				enemies[j].hp -= projectille.damage;
				if (enemies[j].hp <= 0) {
					enemies[j].hp = 0;
					enemies[j].deathtime = (new Date()).getTime();
				} else {
					projectilles.splice(i, 1);
					i--;
				}
				break;
			}
		};
	}
}, 100);
setInterval(function () {
	var playersArr = getAllPlayers();
	enemies.forEach(function (enemy) {
		for (var i = 0; i < playersArr.length; i++) {
			if (areColliding(playersArr[i], enemy, 40) && enemy.aggresive && enemy.hp > 0) {
				playersArr[i].hp -= 4;
				if (playersArr[i].hp <= 0) {
					playersArr[i].hp = 0
					items.push({ x: playersArr[i].x, y: playersArr[i].y, class: 'deadplayer' });
				}
				enemy.isAttacking = true;
			} else {
				enemy.isAttacking = false;
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
			}
		}
	});
}, 200);
var lastUpdateTime = (new Date()).getTime();
setInterval(function () {
	var currentTime = (new Date()).getTime();
	var playersArr = getAllPlayers();
	Object.keys(io.sockets.connected).forEach(function (socketId) {
		io.to(socketId).emit('update', enemies, playersArr, projectilles, currentTime - lastUpdateTime, currentTime);
	});
	lastUpdateTime = currentTime;
}, 50);

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

setInterval(function () {
	var currentTime = (new Date()).getTime();
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].hp <= 0 && currentTime - enemies[i].deathtime > 20000) {
			enemies[i].hp = enemies[i].maxHp;
		}
	};
}, 1000);

setInterval(function () {
	if (boss.hp > 0) {
		var rand = randomInt(0, 360);
		if (boss.hp > boss.maxHp * 8 / 10) {
			projectilles.push(
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'fireball',
					rotation: (0 + rand) * Math.PI / 180,
					speed: 10,
					isPlayerParent: false,
					damage: 35,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'fireball',
					rotation: (90 + rand) * Math.PI / 180,
					speed: 10,
					isPlayerParent: false,
					damage: 35,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'fireball',
					rotation: (180 + rand) * Math.PI / 180,
					speed: 10,
					isPlayerParent: false,
					damage: 35,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'fireball',
					rotation: (270 + rand) * Math.PI / 180,
					speed: 10,
					isPlayerParent: false,
					damage: 35,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'fireball',
					rotation: (315 + rand) * Math.PI / 180,
					speed: 10,
					isPlayerParent: false,
					damage: 35,
					size: 20
				});
		} else if (boss.hp > boss.maxHp * 3 / 10) {
			projectilles.push(
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'darkfireball',
					rotation: (0 + rand) * Math.PI / 180,
					speed: 12,
					isPlayerParent: false,
					damage: 40,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'darkfireball',
					rotation: (20 + rand) * Math.PI / 180,
					speed: 13,
					isPlayerParent: false,
					damage: 40,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'darkfireball',
					rotation: (40 + rand) * Math.PI / 180,
					speed: 14,
					isPlayerParent: false,
					damage: 40,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'darkfireball',
					rotation: (60 + rand) * Math.PI / 180,
					speed: 15,
					isPlayerParent: false,
					damage: 40,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'darkfireball',
					rotation: (80 + rand) * Math.PI / 180,
					speed: 16,
					isPlayerParent: false,
					damage: 40,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'darkfireball',
					rotation: (100 + rand) * Math.PI / 180,
					speed: 17,
					isPlayerParent: false,
					damage: 40,
					size: 20
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'darkfireball',
					rotation: (120 + rand) * Math.PI / 180,
					speed: 18,
					isPlayerParent: false,
					damage: 40,
					size: 20
				});
		} else {
			projectilles.push(
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (0 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (45 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (90 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (135 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (180 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (225 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (270 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				},
				{
					id: server.lastProjectilleID++,
					x: 146 * Map.tileWidth,
					y: 17 * Map.tileHeight,
					class: 'bigfireball',
					rotation: (315 + rand) * Math.PI / 180,
					speed: 9,
					isPlayerParent: false,
					damage: 49,
					size: 40
				});
		}
	}
}, 3000);