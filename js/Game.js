class Game extends Phaser.Scene {
	constructor() {
		super();
	};

	preload() {
		this.load.tilemapTiledJSON('map', 'assets/map/example_map.json');
		this.load.image('tileset', 'assets/map/tilesheet.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('warrior', 'assets/player/warrior.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('mage', 'assets/player/mage.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('ranger', 'assets/player/ranger.png', { frameWidth: 32, frameHeight: 36 });
		this.load.image('otherPlayer', 'assets/player/otherPlayer.png');
	};

	create() {
		this.mapClass = new Map(this);
		this.client = new Client(this);
		AnimationCreator.create(this, "warrior");
		AnimationCreator.create(this, "mage");
		AnimationCreator.create(this, "ranger");
	};
	update() {
		if (this.playerClass != undefined) {
			this.playerClass.update();
			this.client.move(this.playerClass.playerSprite.x, this.playerClass.playerSprite.y);
		}
	}
	addMainPlayer(id, x, y) {
		this.playerClass = new Player({ id: id, scene: this, x: x, y: y, key: this.randomClass() });
		this.map[id] = this.playerClass.playerSprite;
		this.mapClass.setColliders(this.playerClass.playerSprite);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.startFollow(this.playerClass.playerSprite, true, 1, 1);
	}
	addPlayer(id, x, y) {
		this.map[id] = this.add.sprite(x, y, 'otherPlayer');
	}
	movePlayer(id, x, y) {
		var player = this.map[id];
		player.x = x;
		player.y = y;
	}
	removePlayer(id) {
		this.map[id].destroy();
		delete this.map[id];
	}
	randomClass() {
		var randomClass = Math.floor((Math.random() * 3) + 1);
		if (randomClass == 1) {
			return 'warrior';
		} else if (randomClass == 2) {
			return 'mage';
		} else {
			return 'ranger';
		}
	}
}
