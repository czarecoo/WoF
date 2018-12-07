class Game extends Phaser.Scene {
	constructor() {
		super();
		this.socket = io.connect('http://localhost:8081');
	};

	preload() {
		this.load.tilemapTiledJSON('map', 'assets/map/example_map.json');
		this.load.image('tileset', 'assets/map/tilesheet.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('player', 'assets/player/warrior.png', { frameWidth: 32, frameHeight: 36 });
	};

	create() {
		this.map = this.make.tilemap({ key: "map" });
		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, true, true, true, true);
		const tileset = this.map.addTilesetImage("tilesheet", "tileset");
		const sandLayer = this.map.createStaticLayer("sand", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const grassLayer = this.map.createStaticLayer("grass", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const riverLayer = this.map.createStaticLayer("river", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const housesLayer = this.map.createStaticLayer("houses", tileset, 0, 0).setCollisionByProperty({ collides: true });
		const treesLayer = this.map.createStaticLayer("trees", tileset, 0, 0).setCollisionByProperty({ collides: true });

		this.player = new Player({ scene: this, x: 400, y: 200, key: 'player' });

		this.physics.add.collider(this.player.playerSprite, sandLayer);
		this.physics.add.collider(this.player.playerSprite, grassLayer);
		this.physics.add.collider(this.player.playerSprite, riverLayer);
		this.physics.add.collider(this.player.playerSprite, housesLayer);
		this.physics.add.collider(this.player.playerSprite, treesLayer);

		//camera
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.startFollow(this.player.playerSprite, true, 1, 1);
	};
	update() {
		this.player.update();
	}
}
