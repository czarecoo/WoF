var config;
var game;
window.onload = function () {
	config = {
		type: Phaser.AUTO,
		width: 960,
		height: 540,
		backgroundColor: '#FFFFFF',
		physics: {
			default: 'arcade',
			arcade: { gravity: 0 }
		},
		input: {
			activePointers: 2,
		},
		scene: [
			BootScene, Game, GameOverScene
		]
	};

	game = new Phaser.Game(config);

	resize();
	window.addEventListener("resize", resize, false);
};


function resize() {
	var canvas = document.querySelector("canvas");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var windowRatio = windowWidth / windowHeight;
	var gameRatio = config.width / config.height;
	if (windowRatio < gameRatio) {
		canvas.style.width = windowWidth + "px";
		canvas.style.height = (windowWidth / gameRatio) + "px";
	} else {
		canvas.style.width = (windowHeight * gameRatio) + "px";
		canvas.style.height = windowHeight + "px";
	}
}