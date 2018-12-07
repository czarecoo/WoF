class Game extends Phaser.Scene {
	constructor() {
		super();
		this.socket = io.connect('http://localhost:8081');
	};

	preload() {
		this.load.tilemapTiledJSON('map', 'assets/map/example_map.json');
		this.load.image('tileset', 'assets/map/tilesheet.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('player', 'assets/player/warrior.png', { frameWidth: 32, frameHeight: 36 });
	};

	create() {
		this.mapClass = new Map(this);
		this.playerClass = new Player({ scene: this, x: 400, y: 200, key: 'player' });
		this.mapClass.setColliders(this.playerClass.playerSprite);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.startFollow(this.playerClass.playerSprite, true, 1, 1);
	};
	update() {
		this.playerClass.update();
	}
}
