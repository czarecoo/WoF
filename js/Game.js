class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'Game', active: false });
	};
	init(data) {
		this.chosenClass = data.class;
	}
	preload() {
		this.load.tilemapTiledJSON('map', 'assets/map/example_map.json');
		this.load.image('tileset', 'assets/map/tilesheet.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('warrior', 'assets/player/warrior.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('mage', 'assets/player/mage.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('ranger', 'assets/player/ranger.png', { frameWidth: 32, frameHeight: 36 });
		this.load.image('greenBar', 'assets/player/greenBar.png');
		this.load.image('redBar', 'assets/player/redBar.png');
		this.load.spritesheet('brainy', 'assets/enemy/brainy.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('skeleton', 'assets/enemy/skeleton.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('spider', 'assets/enemy/spider.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('zombie', 'assets/enemy/zombie.png', { frameWidth: 32, frameHeight: 64 });
	};

	create() {
		this.mapClass = new Map(this);
		this.client = new Client(this);
		this.players = {};
		AnimationCreator.create(this, "warrior");
		AnimationCreator.create(this, "mage");
		AnimationCreator.create(this, "ranger");
		AnimationCreator.createEnemies(this, "brainy");
		AnimationCreator.createEnemies(this, "skeleton");
		AnimationCreator.createSpider(this, "spider");
		AnimationCreator.createEnemies(this, "zombie");
		this.enemy = new Enemy({ id: 2, scene: this, x: 700, y: 800, key: 'skeleton' });
		this.mapClass.setColliders(this.enemy.playerSprite);
	};
	update() {
		Object.keys(this.players).forEach(id => {
			this.players[id].update();
			if (this.players[id] instanceof Player) {
				this.client.move(this.players[id].playerSprite.x, this.players[id].playerSprite.y);
			}
		});
		this.enemy.update();
	}
	addMainPlayer(id, x, y, randomClass) {
		this.players[id] = new Player({ id: id, scene: this, x: x, y: y, key: randomClass });
		this.mainPlayer = this.players[id];
		this.map[id] = this.players[id].playerSprite;
		this.mapClass.setColliders(this.players[id].playerSprite);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.startFollow(this.players[id].playerSprite, true, 1, 1);
	}
	addPlayer(id, x, y, randomClass) {
		this.players[id] = new OtherPlayer({ id: id, scene: this, x: x, y: y, key: randomClass });
		this.map[id] = this.players[id].playerSprite;
		this.mapClass.setColliders(this.players[id].playerSprite);
	}
	movePlayer(id, x, y) {
		var player = this.players[id];
		player.newX = x;
		player.newY = y;
		if (player instanceof OtherPlayer) {
			player.playerSprite.x = x;
			player.playerSprite.y = y;
		}
	}
	removePlayer(id) {
		this.map[id].destroy();
		delete this.map[id];
		delete this.players[id];
	}
}
