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
		this.nameText = this.scene.add.text(6, 6, this.animationKey.charAt(0).toUpperCase() + this.animationKey.slice(1), { font: '12px Arial', fill: 'black' }).setOrigin(0.5, 0.5);
		this.healthBar = this.scene.physics.add.sprite(config.x, config.y, 'greenBar').setOrigin(0, 0.5);
		this.btnLeft = this.scene.add.sprite(100, 100, 'leftArrow')
			.setInteractive()
			.on('pointerdown', () => this.goingLeft = true)
			.on('pointerup', () => this.goingLeft = false);
		this.btnTop = this.scene.add.sprite(100, 100, 'upArrow')
			.setInteractive()
			.on('pointerdown', () => this.goingTop = true)
			.on('pointerup', () => this.goingTop = false);
		this.btnRight = this.scene.add.sprite(100, 100, 'rightArrow')
			.setInteractive()
			.on('pointerdown', () => this.goingRight = true)
			.on('pointerup', () => this.goingRight = false);
		this.btnDown = this.scene.add.sprite(100, 100, 'downArrow')
			.setInteractive()
			.on('pointerdown', () => this.goingDown = true)
			.on('pointerup', () => this.goingDown = false);
	};
	update() {
		this.btnLeft.x = this.scene.cameras.main.scrollX + 50;
		this.btnLeft.y = this.scene.cameras.main.scrollY + 500;
		this.btnTop.x = this.scene.cameras.main.scrollX + 100;
		this.btnTop.y = this.scene.cameras.main.scrollY + 450;
		this.btnRight.x = this.scene.cameras.main.scrollX + 150
		this.btnRight.y = this.scene.cameras.main.scrollY + 500;
		this.btnDown.x = this.scene.cameras.main.scrollX + 100;
		this.btnDown.y = this.scene.cameras.main.scrollY + 550;

		this.nameText.x = this.playerSprite.x;
		this.nameText.y = this.playerSprite.y - 40;
		this.healthBar.x = this.playerSprite.x - this.playerSprite.displayWidth / 2;
		this.healthBar.y = this.playerSprite.y - 27;
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
		} else if (this.keys.A.isDown || this.goingLeft) {
			this.playerSprite.setVelocityX(-this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkLeft', true);
			this.playerSprite.lastDir = 3;
		} else if (this.keys.D.isDown || this.goingRight) {
			this.playerSprite.setVelocityX(this.playerSprite.Speed);
			this.playerSprite.anims.play(this.animationKey + 'walkRight', true);
			this.playerSprite.lastDir = 1;
		} else if (this.keys.W.isDown || this.goingTop) {
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
	}
}