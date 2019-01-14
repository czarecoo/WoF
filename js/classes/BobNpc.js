class BobNpc {
	constructor(config) {
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.add.sprite(config.x, config.y, 'bobnpc');
		this.playerSprite.x = config.x;
		this.playerSprite.y = config.y;
		this.nameText = this.scene.add.text(config.x, config.y - 27, "Bob", { font: '12px Arial', fill: 'black' }).setOrigin(0.5, 0.5);
		this.exclamationYellow = this.scene.add.sprite(config.x, config.y - 40, 'exclamationYellow').setOrigin(0.5, 0.5);
		this.questionGrey = this.scene.add.sprite(config.x, config.y - 40, 'questionGrey').setOrigin(0.5, 0.5);
		this.questionYellow = this.scene.add.sprite(config.x, config.y - 40, 'questionYellow').setOrigin(0.5, 0.5);
		this.exclamationYellow.visible = true;
		this.questionGrey.visible = false;
		this.questionYellow.visible = false;

		this.STATE = {
			OFFERING: { icon: this.exclamationYellow, dialog: this.createOfferingDialog(), description: null },
			ENCOURAGING: { icon: this.questionGrey, dialog: this.createEncouragingDialog(), description: "-Kill the dragon on the lowest level\nof the cave north of Bob's house" },
			FINISHING: { icon: this.questionYellow, dialog: this.createFinishingDialog(), description: "-Go back to Bob to get reward" },
			GREETING: { icon: null, dialog: this.createGreetingDialog(), description: null }
		};
		this.currentState = this.STATE.OFFERING;
	};

	update() {
		if (this.scene.mainPlayer != undefined && this.STATE != undefined) {
			if (Utils.distance(this.scene.mainPlayer.playerSprite, this.playerSprite) < 100) {
				this.currentState.dialog.visible = true;
				this.scene.isDialogOn = true;
			} else {
				this.currentState.dialog.visible = false;
				this.scene.isDialogOn = false;
			}
		}
	}
	pushQuestState() {
		if (this.currentState == this.STATE.ENCOURAGING) {
			this.currentState.icon.visible = false;
			this.currentState.dialog.visible = false;
			this.currentState = this.STATE.FINISHING;
			this.currentState.dialog.visible = true;
			this.currentState.icon.visible = true;
		}
	}
	createOfferingDialog() {
		var width = this.scene.game.canvas.width;
		var height = this.scene.game.canvas.height;
		var dialog = this.scene.rexUI.add.dialog({
			x: width * 1 / 2,
			y: height * 1 / 2,
			background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0).setDepth(5),
			title: this.scene.rexUI.add.label({
				background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f).setDepth(5),
				text: this.scene.add.text(0, 0, 'Dragon Slaying Part 1', {
					fontSize: '24px'
				}).setDepth(5),
				space: { left: 15, right: 15, top: 10, bottom: 10 }
			}).setDepth(5),
			content: this.scene.add.text(0, 0, 'Bob wants you to slay the dragon\ndeep inside the cave north of town.\n\nWould you like to help him?', {
				fontSize: '20px'
			}).setDepth(5),
			actions: [
				this.createButton(this.scene, 'Accept'),
			],
			space: { title: 25, content: 25, action: 15, left: 20, right: 20, top: 20, bottom: 20, },
			align: { actions: 'center' }
		})
			.layout()
			.setScrollFactor(0)
			.on('button.click', function (button, groupName, index) {
				this.currentState.icon.visible = false;
				this.currentState.dialog.visible = false;
				this.currentState = this.STATE.ENCOURAGING;
				this.currentState.dialog.visible = true;
				this.currentState.icon.visible = true;
			}, this)
			.on('button.over', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle(1, 0xffffff);
			})
			.on('button.out', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle();
			});

		dialog.visible = false;
		return dialog;
	}
	createEncouragingDialog() {
		var width = this.scene.game.canvas.width;
		var height = this.scene.game.canvas.height;
		var dialog = this.scene.rexUI.add.dialog({
			x: width * 1 / 2,
			y: height * 1 / 2,
			background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0).setDepth(5),
			title: this.scene.rexUI.add.label({
				background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f).setDepth(5),
				text: this.scene.add.text(0, 0, 'Dragon Slaying Part 2', {
					fontSize: '24px'
				}).setDepth(5),
				space: { left: 15, right: 15, top: 10, bottom: 10 }
			}).setDepth(5),
			content: this.scene.add.text(0, 0, 'Bob is glad you decided to help\nhim. Come back for a reward\nwhen you slay the beast.', {
				fontSize: '20px'
			}).setDepth(5),
			space: { title: 25, content: 25, action: 15, left: 20, right: 20, top: 20, bottom: 20, },
			align: { actions: 'center' }
		})
			.layout()
			.setScrollFactor(0)
			.on('button.over', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle(1, 0xffffff);
			})
			.on('button.out', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle();
			});

		dialog.visible = false;
		return dialog;
	}
	createFinishingDialog() {
		var width = this.scene.game.canvas.width;
		var height = this.scene.game.canvas.height;
		var dialog = this.scene.rexUI.add.dialog({
			x: width * 1 / 2,
			y: height * 1 / 2,
			background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0).setDepth(5),
			title: this.scene.rexUI.add.label({
				background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f).setDepth(5),
				text: this.scene.add.text(0, 0, 'Dragon Slaying Part 3', {
					fontSize: '24px'
				}).setDepth(5),
				space: { left: 15, right: 15, top: 10, bottom: 10 }
			}).setDepth(5),
			content: this.scene.add.text(0, 0, 'Bob is very happy you killed the beast\nHe wants you to have his old shield.\n\nWould you accept the reward?', {
				fontSize: '20px'
			}).setDepth(5),
			actions: [
				this.createButton(this.scene, 'Accept reward'),
			],
			space: { title: 25, content: 25, action: 15, left: 20, right: 20, top: 20, bottom: 20, },
			align: { actions: 'center' }
		})
			.layout()
			.setScrollFactor(0)
			.on('button.click', function (button, groupName, index) {
				this.scene.client.addItem('shield1');
				this.currentState.icon.visible = false;
				this.currentState.dialog.visible = false;
				this.currentState = this.STATE.GREETING;
				this.currentState.dialog.visible = true;
			}, this)
			.on('button.over', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle(1, 0xffffff);
			})
			.on('button.out', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle();
			});

		dialog.visible = false;
		return dialog;
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
				text: this.scene.add.text(0, 0, 'Dragon Slaying Finished', {
					fontSize: '24px'
				}).setDepth(5),
				space: { left: 15, right: 15, top: 10, bottom: 10 }
			}).setDepth(5),
			content: this.scene.add.text(0, 0, 'Bob is happy to see you. He wishes\nyou luck on your future adventures.', {
				fontSize: '20px'
			}).setDepth(5),
			space: { title: 25, content: 25, action: 15, left: 20, right: 20, top: 20, bottom: 20, },
			align: { actions: 'center' }
		})
			.layout()
			.setScrollFactor(0)
			.on('button.over', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle(1, 0xffffff);
			})
			.on('button.out', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle();
			});

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