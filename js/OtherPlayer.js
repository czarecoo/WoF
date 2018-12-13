class OtherPlayer {
	constructor(config) {
		this.id = config.id;
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
	};
	move(x, y) {
		if (this.lastX < x && this.lastY < y) { //down right
			this.playerSprite.anims.play('walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.lastX > x && this.lastY < y) {//down left
			this.playerSprite.anims.play('walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.lastX > x && this.lastY > y) { //up left
			this.playerSprite.anims.play('walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.lastX < x && this.lastY > y) { //up right
			this.playerSprite.anims.play('walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.lastX > x) {
			this.playerSprite.anims.play('walkLeft', true);
			this.playerSprite.lastDir = 3;
		} else if (this.lastX < x) {
			this.playerSprite.anims.play('walkRight', true);
			this.playerSprite.lastDir = 1;
		} else if (this.lastY > x) {
			this.playerSprite.anims.play('walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.lastY < x) {
			this.playerSprite.anims.play('walkDown', true);
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
		this.x = x;
		this.y = y;
		this.lastX = x;
		this.lastY = y;
	}
}