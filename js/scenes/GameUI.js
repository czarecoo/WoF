class GameUI extends Phaser.Scene {
	constructor() {
		super({ key: 'GameUI', active: false });
	};
	preload() {
		this.load.image('menuBackground', 'assets/ui/menuBackground.png');
		//this.load.image('amuletSlot', 'assets/ui/amuletSlot.png');
		this.load.image('armorSlot', 'assets/ui/armorSlot.png');
		this.load.image('bootsSlot', 'assets/ui/bootsSlot.png');
		this.load.image('emptySlot', 'assets/ui/emptySlot.png');
		this.load.image('helmetSlot', 'assets/ui/helmetSlot.png');
		this.load.image('legsSlot', 'assets/ui/legsSlot.png');
		//this.load.image('ringSlot', 'assets/ui/ringSlot.png');
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
		this.health = this.add.text(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 0.5 / 15, 'Health: ', { font: '20px Arial', fill: 'black' }).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9);
		this.equipmentText = this.add.text(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 2 / 15, 'Equipment: ', { font: '16px Arial', fill: '#000000' }).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9);

		this.eqSlots = {
			'helmet': [
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 3 / 15, 'helmetSlot').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9),
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 3 / 15, 'emptySlot').setName('helmet').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive(),
			],
			'armor': [
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 4 / 15, 'armorSlot').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9),
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 4 / 15, 'emptySlot').setName('armor').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive()
			],
			'legs': [
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 5 / 15, 'legsSlot').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9),
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 5 / 15, 'emptySlot').setName('legs').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive()
			],
			'boots': [
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 6 / 15, 'bootsSlot').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9),
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 6 / 15, 'emptySlot').setName('boots').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive()
			],
			'weapon': [
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 39 / 120, this.sidebarHeight * 4 / 15, 'weaponSlot').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9),
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 39 / 120, this.sidebarHeight * 4 / 15, 'emptySlot').setName('weapon').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive()
			],
			'shield': [
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 81 / 120, this.sidebarHeight * 4 / 15, 'shieldSlot').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9),
				this.add.sprite(this.sidebarX0 + this.sidebarWidth * 81 / 120, this.sidebarHeight * 4 / 15, 'emptySlot').setName('shield').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive()
			],
		};
		//this.amuletSlot = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 39 / 120, this.sidebarHeight * 3 / 15, 'amuletSlot').setName('amulet').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		//this.ringSlot1 = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 39 / 120, this.sidebarHeight * 5 / 15, 'ringSlot').setName('ring1').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
		//this.ringSlot2 = this.add.sprite(this.sidebarX0 + this.sidebarWidth * 81 / 120, this.sidebarHeight * 5 / 15, 'ringSlot').setName('ring2').setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();

		this.equipmentText = this.add.text(this.sidebarX0 + this.sidebarWidth * 1 / 2, this.sidebarHeight * 8 / 15, 'Inventory: ', { font: '16px Arial', fill: '#000000' }).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.9);

		this.items = [];
		this.eq = { 'helmet': null, 'armor': null, 'legs': null, 'boots': null, 'weapon': null, 'shield': null };
		var k = 0;
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				this.add.sprite(10 + this.sidebarX0 + j * 36, this.sidebarHeight * 9 / 15 + i * 36, 'emptySlot').setName(k).setOrigin(0, 0.5).setScrollFactor(0).setAlpha(0.9).setInteractive();
				k++;
			}
		}
		this.timer1 = 0;
		this.unequipTime = 5;
		this.timer2 = 0;
		this.equipTime = 5;
		this.time.addEvent({ delay: 100, loop: true, callback: function () { this.timer1++; this.timer2++ }, callbackScope: this });
		this.input.on('gameobjectdown', this.onObjectClicked, this);
	}
	onObjectClicked(pointer, gameObject) {
		let client = this.scene.get('Game').client;
		if (isNaN(gameObject.name)) { //eq
			if (this.eq[gameObject.name] != null) {
				if (this.timer1 >= this.unequipTime) {
					this.timer1 = 0;
					client.unequip(gameObject.name, this.eq[gameObject.name].name);
				}
			}
		} else {
			if (this.items[gameObject.name] != null) {
				if (this.timer2 >= this.equipTime) {
					this.timer2 = 0;
					client.equip(gameObject.name, this.items[gameObject.name].name);
				}
			}
		}
	}
	update() {
		if (this.timer1 > this.unequipTime) {
			this.timer1 = this.unequipTime;
		}
		if (this.timer2 > this.equipTime) {
			this.timer2 = this.equipTime;
		}
		let mainPlayer = this.scene.get('Game').mainPlayer;
		if (mainPlayer) {
			this.health.setText("Health: " + mainPlayer.hp + " / " + mainPlayer.maxHp);
			this.processItems(mainPlayer.items);
			this.processEq(mainPlayer.eq);
		}
		for (let id in this.eq) {
			if (this.eq[id] == null) {
				this.eqSlots[id][0].active = true;
				this.eqSlots[id][0].visible = true;
			} else {
				this.eqSlots[id][0].active = false;
				this.eqSlots[id][0].visible = false;
			}
		}
	}
	processItems(items) {
		if (items != undefined) {
			var tempItemsArray = [];
			for (var i = 0; i < items.length; i++) {
				if (this.items[i] != undefined && items[i].name == this.items[i].name) {
					tempItemsArray.push(this.items[i]);
				} else {
					tempItemsArray.push(this.add.sprite(28 + this.sidebarX0 + i % 5 * 36, this.sidebarHeight * 9 / 15 + Math.floor(i / 5) * 36, items[i].class).setName(items[i].class).setDepth(2));
					tempItemsArray[tempItemsArray.length - 1].id = items[i].id;
				}
			}
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].destroy();
				this.items.splice(i, 1);
				i--;
			}
			this.items = tempItemsArray;
		}
	}
	processEq(eq) {
		for (let id in eq) {
			if (this.eq[id] != null && eq[id] != null) {
				if (eq[id] != this.eq[id].name) {
					this.eq[id].destroy();
					this.eq[id] = this.add.sprite(this.eqSlots[id][0].x, this.eqSlots[id][0].y, eq[id]).setName(eq[id]).setDepth(2);
				}
			} else if (this.eq[id] == null && eq[id] != null) {
				this.eq[id] = this.add.sprite(this.eqSlots[id][0].x, this.eqSlots[id][0].y, eq[id]).setName(eq[id]).setDepth(2);
			} else if (this.eq[id] != null && eq[id] == null) {
				this.eq[id].destroy();
				this.eq[id] = null;
			}
		}
	}
}
