class OtherPlayer {
	constructor(config) {
		this.id = config.id;
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.physics.add.sprite(config.x, config.y, this.animationKey + 'idleDown');
		this.playerSprite.setCollideWorldBounds(true);
	};
	update() {
		if (this.newX > this.lastX && this.newY > this.lastY) { //right down
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.newX < this.lastX && this.newY > this.lastY) {//left down
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.newX < this.lastX && this.newY < this.lastY) { //left up
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.newX > this.lastX && this.newY < this.lastY) { //right up
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.newX < this.lastX) {
			this.playerSprite.anims.play(this.animationKey + 'walkLeft', true);
			this.playerSprite.lastDir = 3;
		} else if (this.newX > this.lastX) {
			this.playerSprite.anims.play(this.animationKey + 'walkRight', true);
			this.playerSprite.lastDir = 1;
		} else if (this.newY < this.lastY) {
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.newY > this.lastY) {
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
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
		this.lastX = this.newX;
		this.lastY = this.newY;
	}
}