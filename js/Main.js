let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#FFFFFF',
	parent: 'game',
	physics: {
		default: 'arcade',
		arcade: { gravity: 0 }
	},
	scene: [
		BootScene, Game
	]
};

let game = new Phaser.Game(config);