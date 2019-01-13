var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const MapClass = require('./classes/Map.js');
const EnemyCreator = require('./classes/EnemyCreator.js');
const ProjectilleCreator = require('./classes/ProjectilleCreator.js');
var Map = new MapClass();
const util = require('util');
var port = 8080;
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/classes', express.static(__dirname + '/classes'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

server.lastPlayerID = 0;
server.lastitemID = 0;

server.listen(process.env.PORT || port, function () {
	console.log('Listening on ' + server.address().port);
});
var enemies = EnemyCreator.createAll(Map);
var boss = EnemyCreator.createDragon(146 * Map.tileWidth, 17 * Map.tileHeight);
enemies.push(boss);
var players = {};
var projectilles = [];
var items = [];
var bodies = [];

io.on('connection', function (socket) {
	socket.on('init', function (chosenClass) {
		console.log("Player with socketid: " + socket.id + " connected.")
		socket.emit('addBodies', bodies);
		socket.emit('addPlayers', getAllPlayers());
		socket.playerID = server.lastPlayerID++;
		var player = {
			id: socket.playerID,
			x: randomInt(20 * Map.tileWidth, 24 * Map.tileWidth),
			y: randomInt(30 * Map.tileWidth, 32 * Map.tileWidth),
			class: chosenClass,
			maxHp: 100,
			hp: 100,
			equipment: { 'helmet': null, 'armor': null, 'legs': null, 'boots': null, 'weapon': null, 'shield': null },
			items: []
		};
		players[socket.playerID] = player;
		socket.emit('addEnemies', enemies);
		socket.emit('addMainPlayer', players[socket.playerID]);
		socket.broadcast.emit('addPlayer', players[socket.playerID]);

		socket.on('move', function (data) {
			if (socket.playerID != undefined) {
				var player = players[socket.playerID];
				if (player != undefined) {
					if (isTeleportingToDung(data.x, data.y)) {
						player.x = 11.5 * Map.tileWidth;
						player.y = 97 * Map.tileHeight;
						io.emit('forceMovePlayer', player);
					} else if (isTeleportingToTown(data.x, data.y)) {
						player.x = 19.5 * Map.tileWidth;
						player.y = 4 * Map.tileHeight;
						io.emit('forceMovePlayer', player);
					} else if (isTeleportingToDungLadder(data.x, data.y)) {
						player.x = 86.5 * Map.tileWidth;
						player.y = 24 * Map.tileHeight;
						io.emit('forceMovePlayer', player);
					} else if (isTeleportingToBossRoom(data.x, data.y)) {
						player.x = 136.5 * Map.tileWidth;
						player.y = 8 * Map.tileHeight;
						io.emit('forceMovePlayer', player);
					}
					else {
						player.x = data.x;
						player.y = data.y;
					}
				}
			}
		});
		socket.on('shoot', function (projectille) {
			projectille.id = ProjectilleCreator.lastProjectilleID++;
			projectille.isPlayerParent = true;
			projectilles.push(projectille);
		});
		socket.on('pingValue', function (data) {
			socket.emit('pongValue', data);
		});
		socket.on('equip', function (slotId, itemName) {
			let player = players[socket.playerID];
			if (itemName != 'potion0') {
				if (player.equipment[itemName.substring(0, itemName.length - 1)] == null) {
					player.items.splice(slotId, 1);
					player.equipment[itemName.substring(0, itemName.length - 1)] = itemName;
					player.maxHp += 25;
					player.hp += 25;
				}
			} else {
				//if (player.hp < player.maxHp) {
				player.items.splice(slotId, 1);
				player.hp += Math.round(player.maxHp * 1 / 4);
				if (player.hp > player.maxHp) {
					player.hp = player.maxHp;
				}
				//}
			}
		});
		socket.on('unequip', function (slotId, itemName) {
			let player = players[socket.playerID];
			if (player.items.length < 25) {
				player.equipment[slotId] = null;
				player.items.push({ class: itemName })
				player.maxHp -= 25;
				if (player.hp < 25) {
					player.hp -= 1;
				} else {
					player.hp -= 25;
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

var counter = 0;
setInterval(function () {
	//console.log(counter++);
	//console.log(util.inspect(players, false, 3));
	//console.log(util.inspect(items, false, 3));
	//console.log(projectilles.length);
	enemies.forEach(function (enemy) {
		if (enemy.hp <= 0) {
			enemy.direction = -1;
		} else {
			if (!enemy.isAttacking) {
				if (enemy.aggresive) {
					let player = getClosestPlayer(enemy, 32 * 8);
					if (player != null) {
						enemy.direction = Map.findDirectionFromPath(enemy.x, enemy.y, player.x, player.y);
					} else {
						if (randomInt(1, 99) > 60) {
							enemy.direction = randomInt(0, 4);
						}
					}
				} else {
					if (randomInt(1, 99) > 60) {
						enemy.direction = randomInt(0, 4);
					}
				}
			}
		}
	});
}, 2000);
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
			if (players[id].hp > 0 && areColliding(players[id], projectille, projectille.size) && !projectille.isPlayerParent) {
				players[id].hp -= projectille.damage;
				if (players[id].hp <= 0) {
					players[id].hp = 0
					bodies.push({ x: players[id].x, y: players[id].y, class: 'deadplayer' });
				} else {
					projectilles.splice(i, 1);
					i--;
				}
				break;
			}
		}
		for (var j = 0; j < enemies.length; j++) {
			if (enemies[j].hp > 0 && areColliding(enemies[j], projectille, projectille.size) && projectille.isPlayerParent) {
				enemies[j].hp -= projectille.damage;
				if (enemies[j].hp <= 0) {
					enemies[j].hp = 0;
					enemies[j].deathtime = (new Date()).getTime();
					if (enemies[j].drops.length > 0) {
						var rand = randomInt(0, enemies[j].drops.length); // randomInt(0, 2) output: 0 1; randomInt(0, 1) output: 0
						let item = JSON.parse(JSON.stringify(enemies[j].drops[rand]));
						item.id = server.lastitemID++;
						item.x = enemies[j].x;
						item.y = enemies[j].y;
						item.creationTime = enemies[j].deathtime;
						items.push(item);
					}
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
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		for (let id in players) {
			if (areColliding(players[id], item, 32) && players[id].items.length < 25) {
				players[id].items.push(items.splice(i, 1)[0]);
				i--;
				break;
			}
		}
	}
}, 100);

setInterval(function () {
	var playersArr = getAllPlayers();
	enemies.forEach(function (enemy) {
		for (var i = 0; i < playersArr.length; i++) {
			if (areColliding(playersArr[i], enemy, 50) && enemy.aggresive && enemy.hp > 0) {
				playersArr[i].hp -= 4;
				if (playersArr[i].hp <= 0) {
					playersArr[i].hp = 0
					bodies.push({ x: playersArr[i].x, y: playersArr[i].y, class: 'deadplayer' });
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
		io.to(socketId).emit('update', enemies, playersArr, projectilles, currentTime - lastUpdateTime);
	});
	lastUpdateTime = currentTime;
}, 50);

setInterval(function () {
	Object.keys(io.sockets.connected).forEach(function (socketId) {
		var player = players[io.sockets.connected[socketId].playerID];
		if (player) {
			io.to(socketId).emit('updateItems', items, player.equipment);
		}

	});
}, 250);

setInterval(function () {
	var currentTime = (new Date()).getTime();
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].hp <= 0 && currentTime - enemies[i].deathtime > 60000) {
			enemies[i].hp = enemies[i].maxHp;
		}
	};
	for (var i = 0; i < items.length; i++) {
		if (currentTime - items[i].creationTime > 60000) {
			items.splice(i, 1);
			i--;
		}
	};
}, 1000);

setInterval(function () {
	if (boss.hp > 0) {
		var rand = randomInt(0, 360);
		if (boss.hp > boss.maxHp * 8 / 10) {
			projectilles = projectilles.concat(ProjectilleCreator.createPhase1Projectilles(rand, Map));
		} else if (boss.hp > boss.maxHp * 3 / 10) {
			projectilles = projectilles.concat(ProjectilleCreator.createPhase2Projectilles(rand, Map));
		} else {
			projectilles = projectilles.concat(ProjectilleCreator.createPhase3Projectilles(rand, Map));
		}
	}
}, 3000);

function getAllPlayers() {
	var playersArr = [];
	Object.keys(players).forEach(function (socketID) {
		var player = players[socketID];
		if (player) playersArr.push(player);
	});
	return playersArr;
}
function canWalkThere(x, y) {
	return Map.isWalkable(Math.floor(x / Map.tileWidth), Math.floor(y / Map.tileHeight));
}
function isTeleportingToDung(x, y) {
	return Math.floor(x / Map.tileWidth) == 19 && Math.floor(y / Map.tileHeight) == 3;
}
function isTeleportingToTown(x, y) {
	return Math.floor(x / Map.tileWidth) == 11 && Math.floor(y / Map.tileHeight) == 98;
}
function isTeleportingToDungLadder(x, y) {
	return Math.floor(x / Map.tileWidth) == 136 && Math.floor(y / Map.tileHeight) == 7;
}
function isTeleportingToBossRoom(x, y) {
	return Math.floor(x / Map.tileWidth) == 86 && Math.floor(y / Map.tileHeight) == 25;
}
function areColliding(a, b, size) {
	return Math.hypot(a.x - b.x, a.y - b.y) < size;
}
function getClosestPlayer(enemy, size) {
	for (id in players) {
		if (areColliding(players[id], enemy, size)) {
			return players[id];
		}
	}
	return null;
};