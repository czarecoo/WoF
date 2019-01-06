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
		this.load.image('greenBar', 'assets/ui/greenBar.png');
		this.load.image('redBar', 'assets/ui/redBar.png');
		this.load.image('grayBar', 'assets/ui/grayBar.png');
		this.load.image('redBossBar', 'assets/ui/redBossBar.png');
		this.load.spritesheet('brainy', 'assets/enemy/brainy.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('skeleton', 'assets/enemy/skeleton.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('spider', 'assets/enemy/spider.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('zombie', 'assets/enemy/zombie.png', { frameWidth: 32, frameHeight: 64 });
		this.load.spritesheet('dog', 'assets/enemy/dog2.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('white cat', 'assets/enemy/wcat.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('black cat', 'assets/enemy/bcat.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('npc', 'assets/player/otherPlayer.png');
		this.load.plugin('rexvirtualjoystickplugin', 'js/rexvirtualjoystickplugin.min.js', true);
		this.load.spritesheet('dragon', 'assets/enemy/dragon.png', { frameWidth: 200, frameHeight: 192 });

		this.load.image('fireball', 'assets/spells/Fireball.png');
		this.load.image('iceball', 'assets/spells/Iceball.png');
		this.load.image('shuriken', 'assets/spells/Shuriken.png');
		this.load.image('arrow', 'assets/spells/Arrow.png');
	};

	create() {
		this.input.addPointer(1);
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
		AnimationCreator.createDragon(this, "dragon");
		this.projectilles = [];
	};
	update() {
		if (this.mainPlayer != undefined && this.mainPlayer.hp <= 0) {
			this.gameOver();
			return;
		}
		if (this.mainPlayer != undefined) {
			this.mainPlayer.update();
			this.client.move(this.mainPlayer.playerSprite.x, this.mainPlayer.playerSprite.y);
		}
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
			var newEnemy;
			if (data[i].isBoss) {
				newEnemy = new Boss({ id: data[i].id, scene: this, x: data[i].x, y: data[i].y, key: data[i].class });
			} else {
				newEnemy = new Enemy({ id: data[i].id, scene: this, x: data[i].x, y: data[i].y, key: data[i].class, aggresive: data[i].aggresive });
			}
			newEnemy.hp = data[i].hp;
			newEnemy.maxHp = data[i].maxHp;
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
	processUpdate(enemies, players, projectilles, diff) {
		if (this.mainPlayer != undefined && this.mainPlayer.hp <= 0) {
			this.gameOver();
			return;
		}
		for (var i = 0; i < this.enemies.length; i++) {
			this.tweens.add({
				targets: this.enemies[i].playerSprite,
				x: enemies[i].x,               // '+=100'
				y: enemies[i].y,               // '+=100'
				ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
				duration: 100,
				repeat: 0,
				yoyo: false
			})
			//this.enemies[i].playerSprite.x = enemies[i].x;
			//this.enemies[i].playerSprite.y = enemies[i].y;
			this.enemies[i].direction = enemies[i].direction;
			this.enemies[i].playerSprite.speed = enemies[i].speed;
			this.enemies[i].hp = enemies[i].hp;
			this.enemies[i].maxHp = enemies[i].maxHp;
		}
		for (var i = 0; i < players.length; i++) {
			this.updatePlayer(players[i]);
		}
		for (var i = 0; i < this.projectilles.length; i++) {
			this.projectilles[i].destroy();
			this.projectilles.splice(i, 1);
			i--;
		}

		for (var i = 0; i < projectilles.length; i++) {
			this.projectilles.push(this.physics.add.sprite(projectilles[i].x, projectilles[i].y, projectilles[i].class));
			this.projectilles[i].rotation = projectilles[i].rotation;
		}
		this.connectedPlayersText.setText(['Use joystick or press W, S, A or D to walk.', 'Touch or click to use your skill.', '', 'Connected players: ' + players.length + ' diff: ' + diff + ' ms.']);
	}
	updatePlayer(playerData) {
		var player = this.players[playerData.id];
		if (player != undefined) {
			player.maxHp = playerData.maxHp;
			player.hp = playerData.hp;
			if (player instanceof OtherPlayer) {
				player.newX = playerData.x;
				player.newY = playerData.y;
				if (distance(player.playerSprite, playerData, 300)) {
					player.tween = this.tweens.add({
						targets: player.playerSprite,
						x: playerData.x,               // '+=100'
						y: playerData.y,               // '+=100'
						ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
						duration: 100,
						repeat: 0,
						yoyo: false,
						onUpdate: function () {
							player.nameText.x = player.playerSprite.x;
							player.nameText.y = player.playerSprite.y - 40;
							player.healthBar.x = player.playerSprite.x - player.playerSprite.displayWidth / 2;
							player.healthBar.y = player.playerSprite.y - 27;
						}
					})
				} else {
					player.tween.stop()
					player.playerSprite.x = playerData.x;
					player.playerSprite.y = playerData.y;
				}
				player.update();
			}
		}
	}
	forceMovePlayer(id, x, y) {
		var player = this.players[id];
		if (player != undefined && player instanceof Player) {
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

	gameOver() {
		this.client.disconnect();
		this.cameras.main.shake(500);

		this.time.delayedCall(250, function () {
			this.cameras.main.fade(250);
		}, [], this);

		this.time.delayedCall(500, function () {
			this.scene.start('GameOverScene');
		}, [], this);

	};

}
function distance(a, b, size) {
	return Math.hypot(a.x - b.x, a.y - b.y) < size;
}