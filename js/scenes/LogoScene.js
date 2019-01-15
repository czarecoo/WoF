class LogoScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LogoScene', active: true });
	};
	preload() {
		this.load.image('logo', 'assets/logo.png');
	};

	create() {
		var width = this.game.canvas.width;
		var height = this.game.canvas.height;
		this.add.image(width / 2, height / 2, 'logo');
		this.input.on('pointerdown', function () {
			this.scene.start('BootScene');
		}, this);
	};

	update() {
		this.time.delayedCall(1500, function () {
			this.scene.start('BootScene');
		}, [], this);
	}
}
