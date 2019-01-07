class GameOverScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameOverScene', active: false });
	};
	preload() {
	};

	create() {
		var width = this.game.canvas.width;

		this.text1 = this.add.text(width * 1 / 2, 300, 'YOU DIED', { font: '80px Arial', fill: '#000000' }).setOrigin(0.5, 0.5).setInteractive();
		this.text2 = this.add.text(width * 1 / 2, 340, 'play again?', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5).setInteractive();

		this.text1.on('pointerdown', function (pointer) {
			location.reload();
		}, this);
		this.text2.on('pointerdown', function (pointer) {
			location.reload();
		}, this);
	};

	update() {
	}
}
