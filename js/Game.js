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
	};

	create() {
		this.mapClass = new Map(this);
		this.client = new Client(this);
		this.players = {};
		AnimationCreator.create(this, "warrior");
		AnimationCreator.create(this, "mage");
		AnimationCreator.create(this, "ranger");
	};
	update() {
		Object.keys(this.players).forEach(id => {
			this.players[id].update();
			if (this.players[id] instanceof Player) {
				this.client.move(this.players[id].playerSprite.x, this.players[id].playerSprite.y);
			}
		});
	}
	addMainPlayer(id, x, y) {
		this.players[id] = new Player({ id: id, scene: this, x: x, y: y, key: this.randomClass() });
		this.mainPlayer = this.players[id];
		this.map[id] = this.players[id].playerSprite;
		this.mapClass.setColliders(this.players[id].playerSprite);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.startFollow(this.players[id].playerSprite, true, 1, 1);

		Object.keys(this.players).forEach(pid => {
			if (pid != id) {
				this.physics.add.collider(this.mainPlayer.playerSprite, this.players[pid].playerSprite);
			}
		});

	}
	addPlayer(id, x, y) {
		this.players[id] = new OtherPlayer({ id: id, scene: this, x: x, y: y, key: this.randomClass() });
		this.map[id] = this.players[id].playerSprite;
		this.mapClass.setColliders(this.players[id].playerSprite);
		if (this.mainPlayer != undefined) {
			this.physics.add.collider(this.mainPlayer.playerSprite, this.players[id].playerSprite);
		}
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
