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
		this.add.text(10, 10, 'Press 1, 2, 3 or click to choose your class', { font: '20px Arial', fill: '#000000' });
		this.input.keyboard.once('keyup_ONE', function () {
			this.scene.start('Game', { class: 'warrior' });
		}, this);
		this.input.keyboard.once('keyup_TWO', function () {
			this.scene.start('Game', { class: 'mage' });
		}, this);
		this.input.keyboard.once('keyup_THREE', function () {
			this.scene.start('Game', { class: 'ranger' });
		}, this);
		this.add.text(200, 200, 'Warrior', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5);
		this.add.text(400, 200, 'Mage', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5);
		this.add.text(600, 200, 'Ranger', { font: '20px Arial', fill: '#000000' }).setOrigin(0.5, 0.5);
		var warriorImg = this.add.image(200, 400, 'warriorArt').setInteractive();
		var mageImg = this.add.image(400, 400, 'mageArt').setInteractive();
		var rangerImg = this.add.image(600, 400, 'rangerArt').setInteractive();
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
