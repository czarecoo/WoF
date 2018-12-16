var map = require('./assets/map/example_map.json');

class Map {
	constructor() {
		this.collisionTile = 27;
		this.walkingTile = 0;
		this.tileWidth = map.tilewidth;
		this.tileHeight = map.tileheight;
		this.width = map.width;
		this.height = map.height;
		for (var i = 0; i < map.layers.length; i++) {
			if (map.layers[i].name == "collision") {
				this.collision1D = map.layers[i].data;
				break;
			}
		}
	}
	isWalkable(x, y) {
		if (x > this.width - 1 || x < 1 || y > this.height - 1 || y < 1) {
			return false;
		} else {
			return this.collision1D[(y * this.width) + x] == this.walkingTile;
		}


	}
}
module.exports = Map;