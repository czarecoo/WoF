class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'Game', active: false });
	};
	init(data) {
		this.chosenClass = data.class;
	}
	preload() {
		this.load.tilemapTiledJSON('map', 'assets/map/example_map.json');
		this.load.image('tilesetE', 'assets/map/tilesheetE.png');
		this.load.image('dungeonsetE', 'assets/map/dungeonE.png');
		this.load.spritesheet('warrior', 'assets/player/warrior.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('mage', 'assets/player/mage.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('ranger', 'assets/player/ranger.png', { frameWidth: 32, frameHeight: 36 });
		this.load.image('greenBar', 'assets/player/greenBar.png');
		this.load.image('redBar', 'assets/player/redBar.png');
		this.load.spritesheet('brainy', 'assets/enemy/brainy.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('skeleton', 'assets/enemy/skeleton.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('spider', 'assets/enemy/spider.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('zombie', 'assets/enemy/zombie.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('dog', 'assets/enemy/dog2.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('white cat', 'assets/enemy/wcat.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('black cat', 'assets/enemy/bcat.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('npc', 'assets/player/otherPlayer.png');
		this.load.plugin('rexvirtualjoystickplugin', 'js/rexvirtualjoystickplugin.min.js', true);
	};

	create() {
		this.mapClass = new Map(this);
		this.players = {};
		this.enemies = [];
		this.client = new Client(this);
		AnimationCreator.create(this, "warrior");
		AnimationCreator.create(this, "mage");
		AnimationCreator.create(this, "ranger");
		AnimationCreator.createEnemies(this, "brainy");
		AnimationCreator.createEnemies(this, "skeleton");
		AnimationCreator.createSpider(this, "spider");
		AnimationCreator.createEnemies(this, "zombie");
		AnimationCreator.createEnemies(this, "dog");
		AnimationCreator.createEnemies(this, "white cat");
		AnimationCreator.createEnemies(this, "black cat");
		this.someNpc = this.physics.add.sprite(416, 520, 'npc');
		this.connectedPlayersText = this.add.text(55, 55, 'Connected players: ', { font: '16px Arial', fill: '#000000', backgroundColor: 'rgba(255,255,255,0.7)' }).setScrollFactor(0);
	};
	update() {
		Object.keys(this.players).forEach(id => {
			this.players[id].update();
			if (this.players[id] instanceof Player) {
				this.client.move(this.players[id].playerSprite.x, this.players[id].playerSprite.y);
			}
		});
		this.enemies.forEach(function (enemy) {
			enemy.update();
		});
	}
	addPlayer(id, x, y, randomClass) {
		this.players[id] = new OtherPlayer({ id: id, scene: this, x: x, y: y, key: randomClass });
		this.map[id] = this.players[id].playerSprite;
		this.mapClass.setColliders(this.players[id].playerSprite);
	}
	addEnemies(data) {
		for (var i = 0; i < data.length; i++) {
			var newEnemy = new Enemy({ id: data[i].id, scene: this, x: data[i].x, y: data[i].y, key: data[i].class });
			this.mapClass.setColliders(newEnemy);
			this.enemies.push(newEnemy);
		}
	}
	addMainPlayer(id, x, y, randomClass) {
		this.players[id] = new Player({ id: id, scene: this, x: x, y: y, key: randomClass });
		this.mainPlayer = this.players[id];
		this.map[id] = this.players[id].playerSprite;
		this.mapClass.setColliders(this.players[id].playerSprite);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.startFollow(this.players[id].playerSprite, true, 1, 1);
	}
	processUpdate(enemies, players) {
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].playerSprite.x = enemies[i].x;
			this.enemies[i].playerSprite.y = enemies[i].y;
			this.enemies[i].direction = enemies[i].direction;
			this.enemies[i].playerSprite.speed = enemies[i].speed;
		}
		for (var i = 0; i < players.length; i++) {
			this.movePlayer(players[i].id, players[i].x, players[i].y);
		}
		this.connectedPlayersText.setText('Connected players: ' + players.length);
	}
	movePlayer(id, x, y) {
		var player = this.players[id];
		if (player != undefined) {
			if (player instanceof OtherPlayer) {
				player.newX = x;
				player.newY = y;
				player.playerSprite.x = x;
				player.playerSprite.y = y;
			}
		}
	}
	forceMovePlayer(id, x, y) {
		var player = this.players[id];
		if (player != undefined) {
			player.playerSprite.x = x;
			player.playerSprite.y = y;
		}
	}
	removePlayer(id) {
		this.map[id].destroy();
		delete this.map[id];
		this.players[id].nameText.destroy();
		this.players[id].healthBar.destroy();
		delete this.players[id];
	}
}
