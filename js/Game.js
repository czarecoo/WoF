class Game extends Phaser.Scene {
	constructor() {
		super();
		this.socket = io.connect('http://localhost:8081');
	};

	preload() {
		this.load.tilemapTiledJSON('map', 'assets/map/example_map.json');
		this.load.image('tileset', 'assets/map/tilesheet.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('playerRight', 'assets/player/Warrior/WalkingRight.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('playerDown', 'assets/player/Warrior/WalkingDown.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('playerLeft', 'assets/player/Warrior/WalkingLeft.png', { frameWidth: 32, frameHeight: 36 });
		this.load.spritesheet('playerUp', 'assets/player/Warrior/WalkingUp.png', { frameWidth: 32, frameHeight: 36 });
	};

	create() {
		this.map = this.make.tilemap({ key: "map" });
		const tileset = this.map.addTilesetImage("tilesheet", "tileset");
		const sandLayer = this.map.createStaticLayer("sand", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const grassLayer = this.map.createStaticLayer("grass", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const riverLayer = this.map.createStaticLayer("river", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const housesLayer = this.map.createStaticLayer("houses", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const treesLayer = this.map.createStaticLayer("trees", tileset, 0, 0).setCollisionByProperty({ collides: true });

		const framerate = 6;
		this.anims.create({ key: 'walkRight', frames: this.anims.generateFrameNumbers('playerRight'), frameRate: framerate, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'walkDown', frames: this.anims.generateFrameNumbers('playerDown'), frameRate: framerate, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'walkLeft', frames: this.anims.generateFrameNumbers('playerLeft'), frameRate: framerate, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'walkUp', frames: this.anims.generateFrameNumbers('playerUp'), frameRate: framerate, yoyo: false, repeat: -1 });
		this.anims.create({ key: 'idleRight', frames: [{ key: 'playerRight', frame: 0 }], frameRate: 20 });
		this.anims.create({ key: 'idleDown', frames: [{ key: 'playerDown', frame: 0 }], frameRate: 20 });
		this.anims.create({ key: 'idleLeft', frames: [{ key: 'playerLeft', frame: 0 }], frameRate: 20 });
		this.anims.create({ key: 'idleUp', frames: [{ key: 'playerUp', frame: 0 }], frameRate: 20 });
		this.playerSprite = this.physics.add.sprite(400, 200, 'idle');
		this.playerSprite.setCollideWorldBounds(true);

		this.keys = this.input.keyboard.addKeys('W,S,A,D');
		this.playerSprite.Speed = 300;
		this.playerSprite.diagonalSpeedModifier = 0.6;

		this.physics.add.collider(this.playerSprite, sandLayer);
		this.physics.add.collider(this.playerSprite, grassLayer);
		this.physics.add.collider(this.playerSprite, riverLayer);
		this.physics.add.collider(this.playerSprite, housesLayer);
		this.physics.add.collider(this.playerSprite, treesLayer);

		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.startFollow(this.playerSprite, true, 1, 1);
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
