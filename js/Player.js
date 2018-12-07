class Player {
	constructor(config) {
		this.scene = config.scene;
		this.animationKey = config.key;
		const framerate = 6;
		this.scene.anims.create({ key: 'walkRight', frames: this.scene.anims.generateFrameNumbers(this.animationKey, { start: 3, end: 5 }), frameRate: framerate, yoyo: false, repeat: -1 });
		this.scene.anims.create({ key: 'walkDown', frames: this.scene.anims.generateFrameNumbers(this.animationKey, { start: 6, end: 8 }), frameRate: framerate, yoyo: false, repeat: -1 });
		this.scene.anims.create({ key: 'walkLeft', frames: this.scene.anims.generateFrameNumbers(this.animationKey, { start: 9, end: 11 }), frameRate: framerate, yoyo: false, repeat: -1 });
		this.scene.anims.create({ key: 'walkUp', frames: this.scene.anims.generateFrameNumbers(this.animationKey, { start: 0, end: 2 }), frameRate: framerate, yoyo: false, repeat: -1 });
		this.scene.anims.create({ key: 'idleRight', frames: [{ key: this.animationKey, frame: 4 }], frameRate: 0 });
		this.scene.anims.create({ key: 'idleDown', frames: [{ key: this.animationKey, frame: 7 }], frameRate: 0 });
		this.scene.anims.create({ key: 'idleLeft', frames: [{ key: this.animationKey, frame: 10 }], frameRate: 0 });
		this.scene.anims.create({ key: 'idleUp', frames: [{ key: this.animationKey, frame: 1 }], frameRate: 0 });

		this.playerSprite = this.scene.physics.add.sprite(config.x, config.y, 'idleDown');

		this.playerSprite.setCollideWorldBounds(true);
		this.keys = this.scene.input.keyboard.addKeys('W,S,A,D');
		this.playerSprite.Speed = 300;
		this.playerSprite.diagonalSpeedModifier = 0.6;
	};
	update() {
		this.playerSprite.setVelocityX(0);
		this.playerSprite.setVelocityY(0);
		if (this.keys.D.isDown && this.keys.S.isDown) { //down right
			this.playerSprite.setVelocityX(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play('walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.S.isDown && this.keys.A.isDown) {//down left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play('walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.A.isDown && this.keys.W.isDown) { //up left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play('walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.W.isDown && this.keys.D.isDown) { //up right
			this.playerSprite.setVelocityX(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play('walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.A.isDown) {
			this.playerSprite.setVelocityX(-this.playerSprite.Speed);
			this.playerSprite.anims.play('walkLeft', true);
			this.playerSprite.lastDir = 3;
		} else if (this.keys.D.isDown) {
			this.playerSprite.setVelocityX(this.playerSprite.Speed);
			this.playerSprite.anims.play('walkRight', true);
			this.playerSprite.lastDir = 1;
		} else if (this.keys.W.isDown) {
			this.playerSprite.anims.play('walkUp', true);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.S.isDown) {
			this.playerSprite.anims.play('walkDown', true);
			this.playerSprite.setVelocityY(this.playerSprite.Speed);
			this.playerSprite.lastDir = 2;
		} else {
			if (this.playerSprite.lastDir == 1) {
				this.playerSprite.anims.play('idleRight');
			} else if (this.playerSprite.lastDir == 2) {
				this.playerSprite.anims.play('idleDown');
			} else if (this.playerSprite.lastDir == 3) {
				this.playerSprite.anims.play('idleLeft');
			} else if (this.playerSprite.lastDir == 4) {
				this.playerSprite.anims.play('idleUp');
			} else {
				this.playerSprite.anims.play('idleDown');
			}
		}
	}
}