class Player {
	constructor(config) {
		this.id = config.id;
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.physics.add.sprite(config.x, config.y, this.animationKey + 'idleDown');
		this.playerSprite.setCollideWorldBounds(true);
		this.keys = this.scene.input.keyboard.addKeys('W,S,A,D,ONE');
		this.playerSprite.MaxSpeed = 150;
		this.playerSprite.Speed = 150;
		this.nameText = this.scene.add.text(6, 6, "You", { font: '12px Arial', fill: 'black' }).setOrigin(0.5, 0.5);
		this.healthBar = this.scene.physics.add.sprite(config.x, config.y, 'greenBar').setOrigin(0, 0.5);
		this.joyStick = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
			x: 140,
			y: 420,
			radius: 80,
			base: this.scene.add.graphics().fillStyle(0x888888).fillCircle(0, 0, 80),
			thumb: this.scene.add.graphics().fillStyle(0xcccccc).fillCircle(0, 0, 50),
			// dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
			forceMin: 15,
			//enable: !this.scene.game.device.os.desktop
		}).on('update', this.handleJoy, this);
		this.timer = 0;
		this.scene.time.addEvent({ delay: 500, loop: true, callback: function () { this.timer++ }, callbackScope: this });
		this.shootTime = 1;
	};
	update() {
		if (this.scene.game.device.os.desktop) {
			if (this.scene.input.mousePointer.isDown && this.joyStick.pointer == undefined) {
				var angle = Phaser.Math.Angle.Between(this.playerSprite.x, this.playerSprite.y,
					this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX,
					this.scene.input.mousePointer.y + this.scene.cameras.main.scrollY);
				this.shoot(angle * 180 / Math.PI);
			}
		} else {
			var pointer;
			if (this.joyStick.pointer == undefined) {
				pointer = this.scene.input.pointer1;
			} else {
				pointer = this.scene.input.pointer2;
			}
			if (pointer.isDown) {
				var angle = Phaser.Math.Angle.Between(this.playerSprite.x, this.playerSprite.y,
					pointer.x + this.scene.cameras.main.scrollX,
					pointer.y + this.scene.cameras.main.scrollY);
				this.shoot(angle * 180 / Math.PI);
			}
		}

		this.nameText.x = this.playerSprite.x;
		this.nameText.y = this.playerSprite.y - 40;
		this.healthBar.x = this.playerSprite.x - this.playerSprite.displayWidth / 2;
		this.healthBar.y = this.playerSprite.y - 27;
		this.healthBar.displayWidth = this.healthBar.width * this.hp / this.maxHp;
		if (this.healthBar.displayWidth < 0) {
			this.healthBar.displayWidth = 0;
		}
		this.playerSprite.setVelocityX(0);
		this.playerSprite.setVelocityY(0);
		if (this.playerSprite.Speed == 0) { //fix wsad joy sim use bug
			for (var name in this.keys) {
				if (this.keys[name].isDown) {
					this.playerSprite.Speed = this.playerSprite.MaxSpeed;
				}
			}
		}

		if (this.keys.D.isDown && this.keys.S.isDown || this.goingDown && this.goingRight) { //down right
			this.playerSprite.setVelocityX(this.playerSprite.Speed);
			this.playerSprite.setVelocityY(this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.S.isDown && this.keys.A.isDown || this.goingDown && this.goingLeft) {//down left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed);
			this.playerSprite.setVelocityY(this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.A.isDown && this.keys.W.isDown || this.goingUp && this.goingLeft) { //up left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.W.isDown && this.keys.D.isDown || this.goingUp && this.goingRight) { //up right
			this.playerSprite.setVelocityX(this.playerSprite.Speed);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.A.isDown || this.goingLeft) {
			this.playerSprite.setVelocityX(-this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkLeft', true);
			this.playerSprite.lastDir = 3;
		} else if (this.keys.D.isDown || this.goingRight) {
			this.playerSprite.setVelocityX(this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkRight', true);
			this.playerSprite.lastDir = 1;
		} else if (this.keys.W.isDown || this.goingUp) {
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.S.isDown || this.goingDown) {
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.setVelocityY(this.playerSprite.Speed);
			this.playerSprite.lastDir = 2;
		} else {
			if (this.playerSprite.lastDir == 1) {
				this.playerSprite.anims.play(this.animationKey + 'idleRight');
			} else if (this.playerSprite.lastDir == 2) {
				this.playerSprite.anims.play(this.animationKey + 'idleDown');
			} else if (this.playerSprite.lastDir == 3) {
				this.playerSprite.anims.play(this.animationKey + 'idleLeft');
			} else if (this.playerSprite.lastDir == 4) {
				this.playerSprite.anims.play(this.animationKey + 'idleUp');
			} else {
				this.playerSprite.anims.play(this.animationKey + 'idleDown');
			}
		}
		this.playerSprite.body.velocity.normalize().scale(this.playerSprite.Speed);
	}
	handleJoy() {
		this.playerSprite.Speed = this.playerSprite.MaxSpeed * this.joyStick.force / 100;
		if (this.playerSprite.Speed < 0) {
			this.playerSprite.Speed = 0;
		}
		if (this.playerSprite.Speed > this.playerSprite.MaxSpeed) {
			this.playerSprite.Speed = this.playerSprite.MaxSpeed;
		}

		var cursorKeys = this.joyStick.createCursorKeys();
		if (cursorKeys["down"].isDown) {
			this.goingDown = true;
		} else {
			this.goingDown = false;
		}
		if (cursorKeys["left"].isDown) {
			this.goingLeft = true;
		} else {
			this.goingLeft = false;
		}
		if (cursorKeys["right"].isDown) {
			this.goingRight = true;
		} else {
			this.goingRight = false;
		}
		if (cursorKeys["up"].isDown) {
			this.goingUp = true;
		} else {
			this.goingUp = false;
		}
	}
	shoot(rotation) {
		if (this.timer > this.shootTime) {
			this.timer = 0;
			this.scene.client.shoot(
				{
					x: this.playerSprite.x,
					y: this.playerSprite.y,
					rotation: rotation * Math.PI / 180,
					speed: 5,
					class: 'iceball'
				}
			);
		}
	}
}