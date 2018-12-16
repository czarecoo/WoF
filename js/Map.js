class Map {
	constructor(scene) {
		this.scene = scene;
		this.scene.map = this.scene.make.tilemap({ key: "map" });
		this.scene.physics.world.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels, true, true, true, true);
		const tileset = this.scene.map.addTilesetImage("tilesheet", "tileset");
		const dungeon = this.scene.map.addTilesetImage("dungeon", "dungeonset");
		this.sandLayer = this.scene.map.createStaticLayer("sand", tileset, 0, 0).setCollisionByProperty({ collides: true });
		this.dungeon0 = this.scene.map.createStaticLayer("dungeon0", dungeon, 0, 0).setCollisionByProperty({ collides: true });
		this.dungeon1 = this.scene.map.createStaticLayer("dungeon1", dungeon, 0, 0).setCollisionByProperty({ collides: true });
		this.dungeon2 = this.scene.map.createStaticLayer("dungeon2", tileset, 0, 0).setCollisionByProperty({ collides: true });
		this.grassLayer = this.scene.map.createStaticLayer("grass", tileset, 0, 0).setCollisionByProperty({ collides: true });
		this.riverLayer = this.scene.map.createStaticLayer("river", tileset, 0, 0).setCollisionByProperty({ collides: true });
		this.housesLayer = this.scene.map.createStaticLayer("houses", tileset, 0, 0).setCollisionByProperty({ collides: true });
		this.treesLayer = this.scene.map.createStaticLayer("trees", tileset, 0, 0).setCollisionByProperty({ collides: true });
	};
	setColliders(playerSprite) {
		this.playerSprite = playerSprite;
		this.scene.physics.add.collider(this.playerSprite, this.sandLayer);
		this.scene.physics.add.collider(this.playerSprite, this.dungeon0);
		this.scene.physics.add.collider(this.playerSprite, this.dungeon1);
		this.scene.physics.add.collider(this.playerSprite, this.dungeon2);
		this.scene.physics.add.collider(this.playerSprite, this.grassLayer);
		this.scene.physics.add.collider(this.playerSprite, this.riverLayer);
		this.scene.physics.add.collider(this.playerSprite, this.housesLayer);
		this.scene.physics.add.collider(this.playerSprite, this.treesLayer);
	}
}