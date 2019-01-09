class EnemyCreator {
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