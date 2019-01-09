class AnimationCreator {
	static createAll(scene) {
		AnimationCreator.create(scene, "warrior");
		AnimationCreator.create(scene, "mage");
		AnimationCreator.create(scene, "ranger");
		AnimationCreator.createEnemies(scene, "brainy");
		AnimationCreator.createEnemies(scene, "skeleton");
		AnimationCreator.createSpider(scene, "spider");
		AnimationCreator.createEnemies(scene, "zombie");
		AnimationCreator.createEnemies(scene, "mouse");
		AnimationCreator.createEnemies(scene, "dog");
		AnimationCreator.createEnemies(scene, "white cat");
		AnimationCreator.createEnemies(scene, "black cat");
	}
	static create(scene, className) {
		scene.anims.create({ key: className + 'walkRight', frames: scene.anims.generateFrameNumbers(className, { start: 3, end: 5 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkDown', frames: scene.anims.generateFrameNumbers(className, { start: 6, end: 8 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkLeft', frames: scene.anims.generateFrameNumbers(className, { start: 9, end: 11 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkUp', frames: scene.anims.generateFrameNumbers(className, { start: 0, end: 2 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'idleRight', frames: [{ key: className, frame: 4 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleDown', frames: [{ key: className, frame: 7 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleLeft', frames: [{ key: className, frame: 10 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleUp', frames: [{ key: className, frame: 1 }], frameRate: 0 });
	}
	static createEnemies(scene, className) {
		scene.anims.create({ key: className + 'walkRight', frames: scene.anims.generateFrameNumbers(className, { start: 6, end: 8 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkDown', frames: scene.anims.generateFrameNumbers(className, { start: 0, end: 2 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkLeft', frames: scene.anims.generateFrameNumbers(className, { start: 3, end: 5 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkUp', frames: scene.anims.generateFrameNumbers(className, { start: 9, end: 11 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'idleRight', frames: [{ key: className, frame: 7 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleDown', frames: [{ key: className, frame: 1 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleLeft', frames: [{ key: className, frame: 4 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleUp', frames: [{ key: className, frame: 10 }], frameRate: 0 });
	}
	static createSpider(scene, className) {
		scene.anims.create({ key: className + 'walkRight', frames: scene.anims.generateFrameNumbers(className, { start: 12, end: 17 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkDown', frames: scene.anims.generateFrameNumbers(className, { start: 0, end: 5 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkLeft', frames: scene.anims.generateFrameNumbers(className, { start: 6, end: 11 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'walkUp', frames: scene.anims.generateFrameNumbers(className, { start: 18, end: 23 }), frameRate: 6, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'idleRight', frames: [{ key: className, frame: 12 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleDown', frames: [{ key: className, frame: 0 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleLeft', frames: [{ key: className, frame: 6 }], frameRate: 0 });
		scene.anims.create({ key: className + 'idleUp', frames: [{ key: className, frame: 18 }], frameRate: 0 });
	}
	static createDragon(scene, className) {
		scene.anims.create({ key: className + 'moving', frames: scene.anims.generateFrameNumbers(className, { start: 0, end: 2 }), frameRate: 3, yoyo: false, repeat: -1 });
		scene.anims.create({ key: className + 'idle', frames: [{ key: className, frame: 1 }], frameRate: 0 });
	}
}
