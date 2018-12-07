let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: { gravity: 0 }
	},
	scene: [
		Game
	]
};

let game = new Phaser.Game(config);