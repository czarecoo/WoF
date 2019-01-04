class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: 'BootScene', active: true });
	};
	preload() {
		this.load.image('warriorArt', 'assets/player/art/warrior.png');
		this.load.image('mageArt', 'assets/player/art/mage.png');
		this.load.image('rangerArt', 'assets/player/art/ranger.png');
	};

	create() {
		var width = this.game.canvas.width;
		this.add.text(width * 1 / 2, 40, 'Choose your class', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5);
		this.input.keyboard.once('keyup_ONE', function () {
			this.scene.start('Game', { class: 'warrior' });
		}, this);
		this.input.keyboard.once('keyup_TWO', function () {
			this.scene.start('Game', { class: 'mage' });
		}, this);
		this.input.keyboard.once('keyup_THREE', function () {
			this.scene.start('Game', { class: 'ranger' });
		}, this);
		this.add.text(width * 1 / 3, 100, 'Warrior', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5);
		this.add.text(width * 1 / 2, 100, 'Mage', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5);
		this.add.text(width * 2 / 3, 100, 'Ranger', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5);
		var warriorImg = this.add.image(width * 1 / 3, 300, 'warriorArt').setInteractive();
		var mageImg = this.add.image(width * 1 / 2, 300, 'mageArt').setInteractive();
		var rangerImg = this.add.image(width * 2 / 3, 300, 'rangerArt').setInteractive();
		warriorImg.on('pointerdown', function (pointer) {
			this.scene.start('Game', { class: 'warrior' });
		}, this);
		mageImg.on('pointerdown', function (pointer) {
			this.scene.start('Game', { class: 'mage' });
		}, this);
		rangerImg.on('pointerdown', function (pointer) {
			this.scene.start('Game', { class: 'ranger' });
		}, this);
	};

	update() {
	}
}
