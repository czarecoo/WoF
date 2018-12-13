class AnimationCreator {
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
}
