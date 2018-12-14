class Client {
	constructor(Game) {
		this.socket = io.connect('http://localhost:8081');

		this.socket.emit('init', Game.chosenClass);

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

		this.socket.on('movePlayer', function (data) {
			Game.movePlayer(data.id, data.x, data.y);
		});

		this.socket.on('removePlayer', function (id) {
			Game.removePlayer(id);
		});
	}
	move(x, y) {
		this.socket.emit('move', { x: x, y: y });
	};
}