class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'Game', active: false });
	};
	init(data) {
		this.chosenClass = data.class;
	}
	preload() {
		Loader.loadAll(this);
		this.load.scenePlugin({
			key: 'rexuiplugin',
			url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexuiplugin.min.js',
			sceneKey: 'rexUI'
		});
	};

	create() {
		this.input.addPointer(1);
		this.mapClass = new Map(this);
		this.players = {};
		this.enemies = [];
		this.client = new Client(this);
		AnimationCreator.createAll(this);
		this.bobNpc = new BobNpc({ scene: this, x: 430, y: 530, key: "bobnpc" });
		this.connectedPlayersText = this.add.text(10, 10, 'Connected players: ', { font: '16px Arial', fill: '#000000', backgroundColor: 'rgba(255,255,255,0.7)' }).setScrollFactor(0).setDepth(5);
		AnimationCreator.createDragon(this, "dragon");
		this.projectilles = [];
		this.items = [];
		this.isDialogOn = false;
		this.scene.launch('GameUI');
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
		this.projectilles.forEach(function (projectille) {
			if (projectille.class == "shuriken") {
				projectille.rotation++;
			}
		});
		this.bobNpc.update();
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
	addBodies(bodies) {
		for (var i = 0; i < bodies.length; i++) {
			this.add.sprite(bodies[i].x, bodies[i].y, bodies[i].class).setDepth(1);
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
			this.enemies[i].deathtime = enemies[i].deathtime;
		}
		for (var i = 0; i < players.length; i++) {
			this.updatePlayer(players[i]);
		}
		this.processProjectilles(projectilles);
		this.connectedPlayersText.setText(['Use joystick or press W, S, A or D to walk.',
			'Touch or click to use your skill.', '',
			'Connected players: ' + players.length + '.', 'Ping: ' + (this.client.socket.ping != undefined ? this.client.socket.ping + ' ms, ' : 'calculating, ') + ' diff: ' + diff + ' ms, fps: ' + Math.floor(this.game.loop.actualFps)]);
	}
	processProjectilles(projectilles) {
		var tempProjectillesArray = [];
		for (var i = 0; i < projectilles.length; i++) {
			var shouldAdd = true;
			for (var j = 0; j < this.projectilles.length; j++) {
				if (projectilles[i].id == this.projectilles[j].id) {
					this.tweens.add({
						targets: this.projectilles[j],
						x: projectilles[i].x,               // '+=100'
						y: projectilles[i].y,               // '+=100'
						ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
						duration: 100,
						repeat: 0,
						yoyo: false
					})

					//this.projectilles[j].x = projectilles[i].x;
					//this.projectilles[j].y = projectilles[i].y;
					tempProjectillesArray.push(this.projectilles.splice(j, 1)[0]);
					shouldAdd = false;
					break;
				}
			}
			if (shouldAdd) {
				tempProjectillesArray.push(this.physics.add.sprite(projectilles[i].x, projectilles[i].y, projectilles[i].class));
				tempProjectillesArray[tempProjectillesArray.length - 1].id = projectilles[i].id;
				tempProjectillesArray[tempProjectillesArray.length - 1].class = projectilles[i].class;
				tempProjectillesArray[tempProjectillesArray.length - 1].rotation = projectilles[i].rotation;
				tempProjectillesArray[tempProjectillesArray.length - 1].speed = projectilles[i].speed;
				tempProjectillesArray[tempProjectillesArray.length - 1].isPlayerParent = projectilles[i].isPlayerParent;
			}
		}
		for (var i = 0; i < this.projectilles.length; i++) {
			this.projectilles[i].destroy();
			this.projectilles.splice(i, 1);
			i--;
		}
		this.projectilles = tempProjectillesArray;
	}
	processUpdateItems(items) {
		var tempItemsArray = [];
		for (var i = 0; i < items.length; i++) {
			var shouldAdd = true;
			for (var j = 0; j < this.items.length; j++) {
				if (items[i].id == this.items[j].id) {
					tempItemsArray.push(this.items.splice(j, 1)[0]);
					shouldAdd = false;
					break;
				}
			}
			if (shouldAdd) {
				tempItemsArray.push(this.add.sprite(items[i].x, items[i].y, items[i].class).setDepth(2));
				tempItemsArray[tempItemsArray.length - 1].id = items[i].id;
			}
		}
		for (var i = 0; i < this.items.length; i++) {
			this.items[i].destroy();
			this.items.splice(i, 1);
			i--;
		}
		this.items = tempItemsArray;
	}
	updatePlayer(playerData) {
		var player = this.players[playerData.id];
		if (player != undefined) {
			player.maxHp = playerData.maxHp;
			player.hp = playerData.hp;
			if (player instanceof OtherPlayer) {
				player.newX = playerData.x;
				player.newY = playerData.y;
				if (Utils.distance(player.playerSprite, playerData) < 300) {
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
			} else {
				player.items = playerData.items;
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
		this.scene.stop('GameUI');
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
