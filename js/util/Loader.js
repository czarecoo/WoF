class Loader {
	static loadAll(scene) {
		scene.load.tilemapTiledJSON('map', 'assets/map/example_map.json');
		scene.load.image('tilesetE', 'assets/map/tilesheetE.png');
		scene.load.image('dungeonsetE', 'assets/map/dungeonE.png');
		scene.load.spritesheet('warrior', 'assets/player/warrior.png', { frameWidth: 32, frameHeight: 36 });
		scene.load.spritesheet('mage', 'assets/player/mage.png', { frameWidth: 32, frameHeight: 36 });
		scene.load.spritesheet('ranger', 'assets/player/ranger.png', { frameWidth: 32, frameHeight: 36 });
		scene.load.image('greenBar', 'assets/ui/greenBar.png');
		scene.load.image('redBar', 'assets/ui/redBar.png');
		scene.load.image('grayBar', 'assets/ui/grayBar.png');
		scene.load.image('redBossBar', 'assets/ui/redBossBar.png');
		scene.load.spritesheet('brainy', 'assets/enemy/brainy.png', { frameWidth: 32, frameHeight: 64 });
		scene.load.spritesheet('skeleton', 'assets/enemy/skeleton.png', { frameWidth: 32, frameHeight: 64 });
		scene.load.spritesheet('spider', 'assets/enemy/spider.png', { frameWidth: 32, frameHeight: 32 });
		scene.load.spritesheet('zombie', 'assets/enemy/zombie.png', { frameWidth: 32, frameHeight: 64 });
		scene.load.spritesheet('dog', 'assets/enemy/dog2.png', { frameWidth: 32, frameHeight: 32 });
		scene.load.spritesheet('white cat', 'assets/enemy/wcat.png', { frameWidth: 32, frameHeight: 32 });
		scene.load.spritesheet('black cat', 'assets/enemy/bcat.png', { frameWidth: 32, frameHeight: 32 });
		scene.load.image('npc', 'assets/player/otherPlayer.png');
		scene.load.plugin('rexvirtualjoystickplugin', 'js/util/rexvirtualjoystickplugin.min.js', true);
		scene.load.spritesheet('dragon', 'assets/enemy/dragon.png', { frameWidth: 200, frameHeight: 192 });

		scene.load.image('fireball', 'assets/spells/Fireball.png');
		scene.load.image('darkfireball', 'assets/spells/Fireball2.png');
		scene.load.image('bigfireball', 'assets/spells/BigFireball.png');
		scene.load.image('iceball', 'assets/spells/Iceball.png');
		scene.load.image('shuriken', 'assets/spells/Shuriken.png');
		scene.load.image('arrow', 'assets/spells/Arrow.png');

		scene.load.image('deadenemy', 'assets/enemy/dead.png');
		scene.load.image('deadplayer', 'assets/player/deadplayer.png');
	}
}