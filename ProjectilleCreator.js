class ProjectilleCreator {
	static createPhase1Projectilles(rand, Map) {
		var retArr = [];
		retArr.push(ProjectilleCreator.createFireball(0, rand, 10, Map));
		retArr.push(ProjectilleCreator.createFireball(90, rand, 10, Map));
		retArr.push(ProjectilleCreator.createFireball(180, rand, 10, Map));
		retArr.push(ProjectilleCreator.createFireball(270, rand, 10, Map));
		retArr.push(ProjectilleCreator.createFireball(315, rand, 10, Map));
		return retArr;
	}
	static createPhase2Projectilles(rand, Map) {
		var retArr = [];
		var j = 12;
		for (var i = 0; i < 7; i++) {
			retArr.push(ProjectilleCreator.createDarkFireball(i * 20, rand, j, Map));
			j++;
		}
		return retArr;
	}
	static createPhase3Projectilles(rand, Map) {
		var retArr = [];
		for (var i = 0; i < 8; i++) {
			retArr.push(ProjectilleCreator.createBigFireball(i * 45, rand, 9, Map));
		}
		return retArr;
	}
	static createFireball(rot, rand, speed, Map) {
		return {
			id: this.lastProjectilleID++,
			x: 146 * Map.tileWidth,
			y: 17 * Map.tileHeight,
			class: 'fireball',
			rotation: (rot + rand) * Math.PI / 180,
			speed: speed,
			isPlayerParent: false,
			damage: 35,
			size: 20
		}
	}
	static createDarkFireball(rot, rand, speed, Map) {
		return {
			id: this.lastProjectilleID++,
			x: 146 * Map.tileWidth,
			y: 17 * Map.tileHeight,
			class: 'darkfireball',
			rotation: (rot + rand) * Math.PI / 180,
			speed: speed,
			isPlayerParent: false,
			damage: 40,
			size: 20
		}
	}
	static createBigFireball(rot, rand, speed, Map) {
		return {
			id: this.lastProjectilleID++,
			x: 146 * Map.tileWidth,
			y: 17 * Map.tileHeight,
			class: 'bigfireball',
			rotation: (rot + rand) * Math.PI / 180,
			speed: speed,
			isPlayerParent: false,
			damage: 49,
			size: 40
		}
	}
}
ProjectilleCreator.lastProjectilleID = 0;
module.exports = ProjectilleCreator;