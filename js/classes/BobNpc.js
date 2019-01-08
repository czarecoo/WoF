class BobNpc {
	constructor(config) {
		this.scene = config.scene;
		this.animationKey = config.key;
		this.playerSprite = this.scene.add.sprite(config.x, config.y, 'bobnpc');
		this.playerSprite.x= config.x;
		this.playerSprite.y= config.y;
		this.nameText = this.scene.add.text(config.x, config.y - 27, "Bob", { font: '12px Arial', fill: 'black' }).setOrigin(0.5, 0.5);
		this.exclamationYellow = this.scene.add.sprite(config.x, config.y - 40, 'exclamationYellow').setOrigin(0.5, 0.5);
		this.questionGrey = this.scene.add.sprite(config.x, config.y - 40, 'questionGrey').setOrigin(0.5, 0.5);
		this.questionYellow = this.scene.add.sprite(config.x, config.y - 40, 'questionYellow').setOrigin(0.5, 0.5);
		this.exclamationYellow.visible = true;
		this.questionGrey.visible = false;
		this.questionYellow.visible = false;

		this.STATE = {
		OFFERING : {value: 0}, 
		ENCOURAGING: {value: 1}, 
		FINISHING : {value: 2}
		};
	};
	update() {
		var players=this.scene.players;
		Object.keys(players).forEach(function (id) {
			var player = players[id];
			if(Utils.distance(player.playerSprite,this.playerSprite) < 60)
				console.log('player close');
		},this);
	}
}