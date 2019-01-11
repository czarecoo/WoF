class GameUI extends Phaser.Scene {
	constructor() {
		super({ key: 'GameUI', active: false });
	};
	preload() {
		this.load.image('menuBackground', 'assets/ui/menuBackground.png');
		this.load.image('amuletSlot', 'assets/ui/amuletSlot.png');
		this.load.image('armorSlot', 'assets/ui/armorSlot.png');
		this.load.image('bootsSlot', 'assets/ui/bootsSlot.png');
		this.load.image('emptySlot', 'assets/ui/emptySlot.png');
		this.load.image('helmetSlot', 'assets/ui/helmetSlot.png');
		this.load.image('legsSlot', 'assets/ui/legsSlot.png');
		this.load.image('ringSlot', 'assets/ui/ringSlot.png');
		this.load.image('shieldSlot', 'assets/ui/shieldSlot.png');
		this.load.image('weaponSlot', 'assets/ui/weaponSlot.png');
	}
	create() {
		var width = this.game.canvas.width;
		this.menuBackground = this.add.sprite(width, 0, 'menuBackground').setOrigin(1, 0).setScrollFactor(0).setAlpha(0.4);
		this.sidebarX0 = width - this.menuBackground.width;
		this.sidebary0 = 0;
		this.sidebarWidth = this.menuBackground.width
		this.sidebarHeight = this.game.canvas.height;
		this.health = this.add.text(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 0.5 / 15, 'Health: ', { font: '16px Arial', fill: '#000000' }).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9);
		this.equipmentText = this.add.text(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 2 / 15, 'Equipment: ', { font: '16px Arial', fill: '#000000' }).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9);
		this.helmetSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 3 / 15, 'helmetSlot').setName('helmet').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		this.armorSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 4 / 15, 'armorSlot').setName('armor').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		this.legsSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 5 / 15, 'legsSlot').setName('legs').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		this.bootsSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 6 / 15, 'bootsSlot').setName('boots').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();

		this.weaponSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 39 / 120, this.sidebarHeight * 4 / 15, 'weaponSlot').setName('weapon').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		this.shieldSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 81 / 120, this.sidebarHeight * 4 / 15, 'shieldSlot').setName('shield').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();

		//this.amuletSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 39 / 120, this.sidebarHeight * 3 / 15, 'amuletSlot').setName('amulet').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		this.ringSlot1 = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 39 / 120, this.sidebarHeight * 5 / 15, 'ringSlot').setName('ring1').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		//this.ringSlot2 = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 81 / 120, this.sidebarHeight * 5 / 15, 'ringSlot').setName('ring2').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();

		this.equipmentText = this.add.text(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 8 / 15, 'Inventory: ', { font: '16px Arial', fill: '#000000' }).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9);

		this.equipment = [[], [], [], [], []];
		var k = 0;
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				this.equipment[i][j] = this.add.sprite(10 + this.sidebarX0 + j * 36, this.sidebarHeight * 9 / 15 + i * 36, 'emptySlot').setName('eq' + k).setOrigin(0, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
				k++;
			}
		}

		this.input.on('gameobjectdown', this.onObjectClicked);

	}
	onObjectClicked(pointer, gameObject) {
		console.log(gameObject.name);
	}
	update() {
		if (this.scene.get('Game').mainPlayer) {
			this.health.setText("Health: " + this.scene.get('Game').mainPlayer.hp + " / " + this.scene.get('Game').mainPlayer.maxHp);
		}

	}
}
