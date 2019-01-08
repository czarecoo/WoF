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
		var width = this.scene.game.canvas.width;
		var height = this.scene.game.canvas.height;
		this.dialog = this.scene.rexUI.add.dialog({
                x: width*1/2,
                y: height*1/2,
                background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0).setDepth(5),
                title: this.scene.rexUI.add.label({
                    background: this.scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f).setDepth(5),
                    text: this.scene.add.text(0, 0, 'Dragon Slaying', {
                        fontSize: '24px'
                    }).setDepth(5),
                    space: {
                        left: 15,
                        right: 15,
                        top: 10,
                        bottom: 10
                    }
                }).setDepth(5),

                content: this.scene.add.text(0, 0, 'Bob wants you to slay dragon\nin the cave north of town.\n\nWould you like to help him?', {
                    fontSize: '20px'
                }).setDepth(5),

                actions: [
                    this.createButton(this.scene, 'Accept'),
                    this.createButton(this.scene, 'Decline')
                ],

                space: {
                    title: 25,
                    content: 25,
                    action: 15,

                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                },
          
                align: {
                    actions: 'center', // 'center'|'left'|'right'        
                }
            })
            .layout()
            //.drawBounds(this.scene.add.graphics(), 0xff0000)
			.setScrollFactor(0);

        this.print = this.scene.add.text(0, 0, '');
        this.dialog
            .on('button.click', function (button, groupName, index) {
				console.log(index + ': ' + button.text)
            }, this)
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle();
            });
	
		this.dialog.visible=false;
	};
	
	update() {
		var players=this.scene.players;
		Object.keys(players).forEach(function (id) {
			var player = players[id];
			if(Utils.distance(player.playerSprite,this.playerSprite) < 60){
				this.dialog.visible=true;
			}else{
				this.dialog.visible=false;
			}	
		},this);
	}
	createButton(scene, text) {
    	return scene.rexUI.add.label({
			background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x5e92f3).setDepth(5),

			text: scene.add.text(0, 0, text, {
				fontSize: '24px'
			}).setDepth(5),

			space: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10
			}
    	});
	}
}