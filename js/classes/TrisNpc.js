class TrisNpc {
	constructor(config) {
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.add.sprite(config.x, config.y, this.animationKey + 'idleDown');
		this.playerSprite.x = config.x;
		this.playerSprite.y = config.y;
		this.playerSprite.anims.play(this.animationKey + 'idleDown');
		this.nameText = this.scene.add.text(config.x, config.y - 27, "Tris", { font: '12px Arial', fill: 'black' }).setOrigin(0.5, 0.5);

		this.STATE = {
			GREETING: { icon: null, dialog: this.createGreetingDialog(), description: null }
		};
		this.currentState = this.STATE.GREETING;
	};

	update() {
		if (this.scene.mainPlayer != undefined && this.STATE != undefined) {
			if (Utils.distance(this.scene.mainPlayer.playerSprite, this.playerSprite) < 90) {
				this.currentState.dialog.visible = true;
				this.scene.isDialogOn = true;
			} else {
				this.currentState.dialog.visible = false;
				this.scene.isDialogOn = false;
			}
		}
	}
	createGreetingDialog() {
		var width = this.scene.game.canvas.width;
		var height = this.scene.game.canvas.height;
		var dialog = this.scene.rexUI.add.dialog({
			x: width * 1 / 2,
			y: height * 1 / 2,
			background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0).setDepth(5),
			title: this.scene.rexUI.add.label({
				background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f).setDepth(5),
				text: this.scene.add.text(0, 0, 'Greetings', {
					fontSize: '24px'
				}).setDepth(5),
				space: { left: 15, right: 15, top: 10, bottom: 10 }
			}).setDepth(5),
			content: this.scene.add.text(0, 0, 'Tris welcomes you in World of Fibula\nShe tells you that Bob might need your help.\n\nBob is standing in front of his house\nnorth-west from here.', {
				fontSize: '20px'
			}).setDepth(5),
			space: { title: 25, content: 25, action: 15, left: 20, right: 20, top: 20, bottom: 20, },
			align: { actions: 'center' }
		})
			.layout()
			.setScrollFactor(0);

		dialog.visible = false;
		return dialog;
	}
	createButton(scene, text) {
		return scene.rexUI.add.label({
			background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x5e92f3).setDepth(5),
			text: scene.add.text(0, 0, text, { fontSize: '24px' }).setDepth(5),
			space: { left: 10, right: 10, top: 10, bottom: 10 }
		});
	}
}