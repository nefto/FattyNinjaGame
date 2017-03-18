window.addEventListener('load', function () {
	let gameCanvas = document.getElementById('game-canvas');
	let gameContext = gameCanvas.getContext('2d');

	let ninjaRunningImg = document.getElementById('ninja-running');

	let ninjaSprite = createSprite({
		spriteSheet: ninjaRunningImg,
		context: gameContext,
		width: ninjaRunningImg.width / 4,
		height: ninjaRunningImg.height,
		numberOfFrames: 4,
		loopTicksPerFrame: 5
	});

	let ninjaPhysicalBody = createPhysicalBody({
		coordinates: { x: 0, y: 0 },
		speed: { x: 5, y: 0 },
		height: ninjaSprite.height,
		width: ninjaSprite.width
	});


	window.addEventListener('keydown', function (ev) {

	});


	function gameLoop() {
		let lastNinjaCoordinates = ninjaPhysicalBody.move();

		ninjaSprite.render(ninjaPhysicalBody.coordinates, lastNinjaCoordinates);
		ninjaSprite.update();


		window.requestAnimationFrame(gameLoop);
	}

	gameLoop();
});