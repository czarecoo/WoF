class Client {
	constructor(Game) {
		this.socket = io.connect('http://localhost:8081');

		this.socket.emit('init', Game.chosenClass);

		setInterval(function () {
			this.socket.emit('pingValue', (new Date()).getTime());
		}.bind(this), 1000);
		this.socket.on('pongValue', function (data) {
			Game.lastPing = (new Date()).getTime() - parseInt(data, 10);
		});
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
		this.socket.on('addItems', function (data) {
			Game.addItems(data);
		});
		this.socket.on('update', function (enemies, players, projectilles, diff) {
			Game.processUpdate(enemies, players, projectilles, diff);
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
}