class Boss {
	constructor(config) {
		this.id = config.id;
		this.scene = config.scene;
		this.animationKey = config.key;
		this.deadSprite = this.scene.physics.add.sprite(0, 0, 'deadenemy');
		this.deadSprite.visible = false;
		this.playerSprite = this.scene.physics.add.sprite(config.x, config.y, this.animationKey + 'idle');
		this.playerSprite.setCollideWorldBounds(true);
		this.nameText = this.scene.add.text(6, 6, this.animationKey.charAt(0).toUpperCase() + this.animationKey.slice(1), { font: '20px Arial', fill: 'red' }).setOrigin(0.5, 0.5);
		this.healthBar = this.scene.physics.add.sprite(config.x, config.y, 'redBossBar').setOrigin(0, 0.5);

		//this.timer = 0;
		//this.scene.time.addEvent({ delay: 1000, loop: true, callback: function () { this.timer++ }, callbackScope: this });
		//this.changeDir = 1;
		this.direction = 4;
	};
	update() {
		if (this.hp <= 0) {
			if (Utils.distance(this.scene.mainPlayer.playerSprite, this.playerSprite) < 500) {
				this.scene.bobNpc.pushQuestState();
			}
			this.playerSprite.visible = false;
			this.nameText.visible = false;
			this.healthBar.visible = false;
			this.deadSprite.visible = true;
		} else {
			this.playerSprite.visible = true;
			this.nameText.visible = true;
			this.healthBar.visible = true;
			this.deadSprite.visible = false;
			this.deadSprite.x = this.playerSprite.x;
			this.deadSprite.y = this.playerSprite.y;
		}
		this.nameText.x = this.playerSprite.x;
		this.nameText.y = this.playerSprite.y - 110;
		this.healthBar.x = this.playerSprite.x - this.playerSprite.displayWidth / 2
		this.healthBar.y = this.playerSprite.y - 80;
		this.healthBar.displayWidth = this.healthBar.width * this.hp / this.maxHp;
		/*
		if (this.timer > this.changeDir) {
			this.timer = 0;
			this.direction = this.randomInt(0, 5);
		}
		*/
		this.playerSprite.anims.play(this.animationKey + 'moving', true);
	}
	randomInt(low, high) {
		return Math.floor(Math.random() * (high - low) + low);
	}
}