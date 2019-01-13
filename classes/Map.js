var map = require('../assets/map/example_map.json');
var PF = require('pathfinding');

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
		this.grid = new PF.Grid(this.width, this.height);
		for (let j = 0; j < this.height; j++) {
			for (let i = 0; i < this.width; i++) {
				if (this.collision1D[this.width * j + i] == 27) {
					this.grid.setWalkableAt(i, j, false);
				} else {
					this.grid.setWalkableAt(i, j, true);
				}
			}
		}
		this.finder = new PF.AStarFinder();
	}
	isWalkable(x, y) {
		if (x > this.width - 1 || x < 1 || y > this.height - 1 || y < 1) {
			return false;
		} else {
			return this.collision1D[(y * this.width) + x] == this.walkingTile;
		}
	}
	findDirectionFromPath(x1, y1, x2, y2) {
		let newX1 = Math.floor(x1 / this.tileWidth);
		let newY1 = Math.floor(y1 / this.tileHeight);
		let newX2 = Math.floor(x2 / this.tileWidth);
		let newY2 = Math.floor(y2 / this.tileHeight);

		var gridBackup = this.grid.clone();
		var path = this.finder.findPath(newX1, newY1, newX2, newY2, gridBackup);

		var direction = 0;
		if (path != undefined && path[1] != undefined) {
			var nextCell = path[1];
			if (nextCell[0] < newX1) {
				direction = 0; //left
			} else if (nextCell[0] > newX1) {
				direction = 1; //right
			} else if (nextCell[1] < newY1) {
				direction = 2; //up
			} else if (nextCell[1] > newY1) {
				direction = 3; //down
			}
		}

		return direction;
	}
}
module.exports = Map;