let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: { system: 'impact', gravity: 0, cellSize: 32 }
	},
	scene: [
		Game
	]
};

let game = new Phaser.Game(config);