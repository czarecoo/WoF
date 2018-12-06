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
		const sandLayer = this.map.createStaticLayer("sand", tileset, 0, 0);
		const grassLayer = this.map.createStaticLayer("grass", tileset, 0, 0);
		const riverLayer = this.map.createStaticLayer("river", tileset, 0, 0);
		const housesLayer = this.map.createStaticLayer("houses", tileset, 0, 0);
		const treesLayer = this.map.createStaticLayer("trees", tileset, 0, 0);

		const framerate = 6;
		this.anims.create({key: 'walkRight', frames: this.anims.generateFrameNumbers('playerRight'), frameRate: framerate, yoyo: false, repeat: -1});
		this.anims.create({key: 'walkDown', frames: this.anims.generateFrameNumbers('playerDown'), frameRate: framerate, yoyo: false, repeat: -1});
		this.anims.create({key: 'walkLeft', frames: this.anims.generateFrameNumbers('playerLeft'), frameRate: framerate, yoyo: false, repeat: -1});
		this.anims.create({key: 'walkUp', frames: this.anims.generateFrameNumbers('playerUp'), frameRate: framerate, yoyo: false, repeat: -1});
		this.playerSprite = this.add.sprite(400, 200, 'playerDown');
		this.keys = this.input.keyboard.addKeys('W,S,A,D');
		this.playerSprite.velX=0;
		this.playerSprite.velY=0;
	};
	update(){
		this.playerSprite.x+=this.playerSprite.velX;
		this.playerSprite.y+=this.playerSprite.velY;
		if (this.keys.A.isDown && this.playerSprite.isMoving==0)
		{
			//this.playerSprite.setVelocityX(-300);
			this.playerSprite.anims.play('walkLeft');
			this.playerSprite.isMoving=1;
			this.playerSprite.velX=-4;
		}
		else if (this.keys.D.isDown && this.playerSprite.isMoving==0)
		{
			//player.setVelocityX(300);
			this.playerSprite.anims.play('walkRight');
			this.playerSprite.isMoving=1;
			this.playerSprite.velX=4;
		}
		if (this.keys.W.isDown && this.playerSprite.isMoving==0)
		{
			//player.setVelocityY(-300);
			this.playerSprite.anims.play('walkUp');
			this.playerSprite.isMoving=1;
			this.playerSprite.velY=-4;
		}
		else if (this.keys.S.isDown && this.playerSprite.isMoving==0)
		{
			//player.setVelocityY(300);
			this.playerSprite.anims.play('walkDown');
			this.playerSprite.isMoving=1;
			this.playerSprite.velY=4;
		}
		if(this.keys.W.isUp && this.keys.S.isUp && this.keys.A.isUp && this.keys.D.isUp){
			this.playerSprite.anims.stop();
			this.playerSprite.isMoving=0;
			this.playerSprite.velX=0;
			this.playerSprite.velY=0;
		}
	}
}
