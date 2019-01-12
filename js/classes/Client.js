class Client {
	constructor(Game) {
		this.socket = io.connect();

		this.socket.emit('init', Game.chosenClass);

		this.socket.on('pongValue', function (data) {
			this.ping = (new Date()).getTime() - data;
		});
		var that = this;
		setInterval(function () {
			var time = (new Date()).getTime();
			that.socket.emit('pingValue', time);
		}, 1000);

		this.socket.on('addMainPlayer', function (data) {
			Game.addMainPlayer(data.id, data.x, data.y, data.class);
		});
		this.socket.on('addPlayer', function (data) {
			Game.addPlayer(data.id, data.x, data.y, data.class);
		});
		this.socket.on('addPlayers', function (data) {
			for (var i = 0; i < data.length; i++) {
				Game.addPlayer(data[i].id, data[i].x, data[i].y, data[i].class);
			}
		});
		this.socket.on('addEnemies', function (data) {
			Game.addEnemies(data);
		});
		this.socket.on('addBodies', function (data) {
			Game.addBodies(data);
		});
		this.socket.on('update', function (enemies, players, projectilles, diff) {
			Game.processUpdate(enemies, players, projectilles, diff);
		});
		this.socket.on('updateItems', function (items, eq) {
			Game.processUpdateItems(items);
			Game.processUpdateEq(eq);
		});
		this.socket.on('forceMovePlayer', function (data) {
			Game.forceMovePlayer(data.id, data.x, data.y);
		});
		this.socket.on('removePlayer', function (id) {
			Game.removePlayer(id);
		});
	}
	move(x, y) {
		this.socket.emit('move', { x: x, y: y });
	};
	disconnect() {
		this.socket.emit('disconnect');
		this.socket.close();
	}
	shoot(projectille) {
		this.socket.emit('shoot', projectille);
	}
	equip(slotID, itemName) {
		this.socket.emit('equip', slotID, itemName);
	}
	unequip(slotID, itemName) {
		this.socket.emit('unequip', slotID, itemName);
	}
}