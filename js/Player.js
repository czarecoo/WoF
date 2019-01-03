class Player {
	constructor(config) {
		this.id = config.id;
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.physics.add.sprite(config.x, config.y, this.animationKey + 'idleDown');
		this.playerSprite.setCollideWorldBounds(true);
		this.keys = this.scene.input.keyboard.addKeys('W,S,A,D');
		this.playerSprite.MaxSpeed = 300;
		this.playerSprite.Speed = 300;
		this.playerSprite.diagonalSpeedModifier = 0.6;
		this.nameText = this.scene.add.text(6, 6, this.animationKey.charAt(0).toUpperCase() + this.animationKey.slice(1), { font: '12px Arial', fill: 'black' }).setOrigin(0.5, 0.5);
		this.healthBar = this.scene.physics.add.sprite(config.x, config.y, 'greenBar').setOrigin(0, 0.5);
		this.joyStick = this.scene.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
			x: 120,
			y: 480,
			radius: 80,
			base: this.scene.add.graphics().fillStyle(0x888888).fillCircle(0, 0, 80),
			thumb: this.scene.add.graphics().fillStyle(0xcccccc).fillCircle(0, 0, 50),
			// dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
			forceMin: 15,
			// enable: true
		}).on('update', this.handleJoy, this);
	};
	update() {
		this.nameText.x = this.playerSprite.x;
		this.nameText.y = this.playerSprite.y - 40;
		this.healthBar.x = this.playerSprite.x - this.playerSprite.displayWidth / 2;
		this.healthBar.y = this.playerSprite.y - 27;
		this.playerSprite.setVelocityX(0);
		this.playerSprite.setVelocityY(0);
		if (this.keys.D.isDown && this.keys.S.isDown || this.goingDown && this.goingRight) { //down right
			this.playerSprite.setVelocityX(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.S.isDown && this.keys.A.isDown || this.goingDown && this.goingLeft) {//down left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.A.isDown && this.keys.W.isDown || this.goingUp && this.goingLeft) { //up left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.W.isDown && this.keys.D.isDown || this.goingUp && this.goingRight) { //up right
			this.playerSprite.setVelocityX(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
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
		this.playerSprite.x = Math.round(this.playerSprite.x);
		this.playerSprite.y = Math.round(this.playerSprite.y);
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
}