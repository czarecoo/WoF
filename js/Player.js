class Player {
	constructor(config) {
		this.id = config.id;
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.physics.add.sprite(config.x, config.y, this.animationKey + 'idleDown');
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
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.S.isDown && this.keys.A.isDown) {//down left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play(this.animationKey + 'walkDown', true);
			this.playerSprite.lastDir = 2;
		} else if (this.keys.A.isDown && this.keys.W.isDown) { //up left
			this.playerSprite.setVelocityX(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.W.isDown && this.keys.D.isDown) { //up right
			this.playerSprite.setVelocityX(this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed * this.playerSprite.diagonalSpeedModifier);
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.A.isDown) {
			this.playerSprite.setVelocityX(-this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkLeft', true);
			this.playerSprite.lastDir = 3;
		} else if (this.keys.D.isDown) {
			this.playerSprite.setVelocityX(this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkRight', true);
			this.playerSprite.lastDir = 1;
		} else if (this.keys.W.isDown) {
			this.playerSprite.anims.play(this.animationKey + 'walkUp', true);
			this.playerSprite.setVelocityY(-this.playerSprite.Speed);
			this.playerSprite.lastDir = 4;
		} else if (this.keys.S.isDown) {
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
}