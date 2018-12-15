class Enemy {
	constructor(config) {
		this.id = config.id;
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.physics.add.sprite(config.x, config.y, this.animationKey + 'idleDown');
		this.playerSprite.setCollideWorldBounds(true);
		this.playerSprite.Speed = 200;
		this.playerSprite.diagonalSpeedModifier = 0.6;
		this.nameText = this.scene.add.text(6, 6, this.animationKey.charAt(0).toUpperCase() + this.animationKey.slice(1), { font: '12px Arial', fill: 'black' }).setOrigin(0.5, 0.5);
		this.healthBar = this.scene.physics.add.sprite(config.x, config.y, 'redBar').setOrigin(0, 0.5);
		this.timer = 0;
		this.scene.time.addEvent({ delay: 1000, loop: true, callback: function () { this.timer++ }, callbackScope: this });
		this.changeDir = 1;
		this.direction = this.randomInt(0, 4);
	};
	update() {
		this.nameText.x = this.playerSprite.x;
		this.nameText.y = this.playerSprite.y - 40;
		this.healthBar.x = this.playerSprite.x - this.playerSprite.displayWidth / 2;
		this.healthBar.y = this.playerSprite.y - 27;
		this.playerSprite.setVelocityX(0);
		this.playerSprite.setVelocityY(0);
		if (this.timer > this.changeDir) {
			this.timer = 0;
			this.direction = this.randomInt(0, 5);
		}
		if (this.direction == 0) {
			this.playerSprite.setVelocityX(-this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkLeft', true);
			this.playerSprite.lastDir = 3;
		} else if (this.direction == 1) {
			this.playerSprite.setVelocityX(this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkRight', true);
			this.playerSprite.lastDir = 1;
		} else if (this.direction == 2) {
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed);
			this.playerSprite.lastDir = 4;
		} else if (this.direction == 3) {
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
	}
	randomInt(low, high) {
		return Math.floor(Math.random() * (high - low) + low);
	}
}