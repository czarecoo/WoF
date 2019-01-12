class EnemyCreator {
	static createAll(Map) {
		return [
			EnemyCreator.createMouse(6 * Map.tileWidth, 90 * Map.tileHeight),
			EnemyCreator.createMouse(7 * Map.tileWidth, 85 * Map.tileHeight),
			EnemyCreator.createMouse(14 * Map.tileWidth, 75 * Map.tileHeight),
			EnemyCreator.createMouse(16 * Map.tileWidth, 71 * Map.tileHeight),
			EnemyCreator.createMouse(32 * Map.tileWidth, 67 * Map.tileHeight),
			EnemyCreator.createMouse(66 * Map.tileWidth, 68 * Map.tileHeight),
			EnemyCreator.createMouse(49 * Map.tileWidth, 96 * Map.tileHeight),
			EnemyCreator.createMouse(86 * Map.tileWidth, 69 * Map.tileHeight),
			EnemyCreator.createSpider(34 * Map.tileWidth, 83 * Map.tileHeight),
			EnemyCreator.createSpider(6 * Map.tileWidth, 65 * Map.tileHeight),
			EnemyCreator.createSpider(75 * Map.tileWidth, 65 * Map.tileHeight),
			EnemyCreator.createSkeleton(57 * Map.tileWidth, 68 * Map.tileHeight),
			EnemyCreator.createSkeleton(49 * Map.tileWidth, 72 * Map.tileHeight),
			EnemyCreator.createSkeleton(86 * Map.tileWidth, 42 * Map.tileHeight),
			EnemyCreator.createSkeleton(89 * Map.tileWidth, 41 * Map.tileHeight),
			EnemyCreator.createSkeleton(81 * Map.tileWidth, 56 * Map.tileHeight),
			EnemyCreator.createSkeleton(93 * Map.tileWidth, 40 * Map.tileHeight),
			EnemyCreator.createBrainy(139 * Map.tileWidth, 94 * Map.tileHeight),
			EnemyCreator.createSkeleton(152 * Map.tileWidth, 87 * Map.tileHeight),
			EnemyCreator.createZombie(73 * Map.tileWidth, 88 * Map.tileHeight),
			EnemyCreator.createZombie(92 * Map.tileWidth, 86 * Map.tileHeight),
			EnemyCreator.createZombie(127 * Map.tileWidth, 60 * Map.tileHeight),
			EnemyCreator.createZombie(109 * Map.tileWidth, 42 * Map.tileHeight),
			EnemyCreator.createBrainy(96 * Map.tileWidth, 69 * Map.tileHeight),
			EnemyCreator.createBrainy(93 * Map.tileWidth, 18 * Map.tileHeight),
			EnemyCreator.createSkeleton(100 * Map.tileWidth, 25 * Map.tileHeight),
			EnemyCreator.createSkeleton(95 * Map.tileWidth, 24 * Map.tileHeight),
			EnemyCreator.createSkeleton(95 * Map.tileWidth, 26 * Map.tileHeight),
			EnemyCreator.createSkeleton(93 * Map.tileWidth, 12 * Map.tileHeight),
			EnemyCreator.createZombie(86 * Map.tileWidth, 23 * Map.tileHeight),
			EnemyCreator.createWhiteCat(6 * Map.tileWidth, 28 * Map.tileHeight),
			EnemyCreator.createDog(33 * Map.tileWidth, 17 * Map.tileHeight),
			EnemyCreator.createBlackCat(48 * Map.tileWidth, 16 * Map.tileHeight)
		];
	}
	static createBlackCat(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'black cat',
			direction: 4,
			speed: 6,
			aggresive: false,
			isBoss: false,
			maxHp: 1,
			hp: 1,
			isAttacking: false
		}
	}
	static createWhiteCat(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'white cat',
			direction: 4,
			speed: 7,
			aggresive: false,
			isBoss: false,
			maxHp: 1,
			hp: 1,
			isAttacking: false
		}
	}
	static createDog(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'dog',
			direction: 4,
			speed: 5,
			aggresive: false,
			isBoss: false,
			maxHp: 1,
			hp: 1,
			isAttacking: false
		}
	}
	static createMouse(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'mouse',
			direction: 4,
			speed: 8,
			aggresive: true,
			isBoss: false,
			maxHp: 25,
			hp: 25,
			isAttacking: false
		}
	}
	static createSpider(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'spider',
			direction: 4,
			speed: 8,
			aggresive: true,
			isBoss: false,
			maxHp: 35,
			hp: 35,
			isAttacking: false
		}
	}
	static createBrainy(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'brainy',
			direction: 4,
			speed: 9,
			aggresive: true,
			isBoss: false,
			maxHp: 50,
			hp: 50,
			isAttacking: false
		}
	}
	static createZombie(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'zombie',
			direction: 4,
			speed: 4,
			aggresive: true,
			isBoss: false,
			maxHp: 200,
			hp: 200,
			isAttacking: false
		}
	}
	static createSkeleton(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'skeleton',
			direction: 4,
			speed: 5,
			aggresive: true,
			isBoss: false,
			maxHp: 100,
			hp: 100,
			isAttacking: false
		}
	}
	static createDragon(x, y) {
		return {
			id: this.lastEnemyID++,
			x: x,
			y: y,
			class: 'dragon',
			direction: 4,
			speed: 0,
			aggresive: true,
			isBoss: true,
			maxHp: 2000,
			hp: 2000,
			isAttacking: false
		}
	}

}
EnemyCreator.lastEnemyID = 0;
module.exports = EnemyCreator;