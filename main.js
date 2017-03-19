window.addEventListener('load', function () {
	let gameCanvas = document.getElementById('game-canvas');
	let gameContext = gameCanvas.getContext('2d');

	let ninjaRunningImg = document.getElementById('ninja-running');

	let gameWalkingLine = gameCanvas.height - (ninjaRunningImg.height + 10);

	let ninjaSprite = createSprite({
		spriteSheet: ninjaRunningImg,
		context: gameContext,
		width: ninjaRunningImg.width / 4,
		height: ninjaRunningImg.height,
		numberOfFrames: 4,
		loopTicksPerFrame: 5
	});

	let ninjaPhysicalBody = createPhysicalBody({
		coordinates: { x: 30, y: gameWalkingLine / 2 },
		speed: { x: 0, y: 0 },
		height: ninjaSprite.height,
		width: ninjaSprite.width
	});

	window.addEventListener('keydown', function (ev) {
		let speed = 4;

		// left arrow => walk left
		if (ev.keyCode === 37) {
			ninjaPhysicalBody.speed.x = -speed;
		}
		// up arrow => jump
		if (ev.keyCode === 38) {
			if (ninjaPhysicalBody.coordinates.y < gameWalkingLine) {
				return;
			}

			ninjaPhysicalBody.speed.y = -speed * 1.3;
		}
		// right arrow => walk right
		if (ev.keyCode === 39) {
			ninjaPhysicalBody.speed.x = speed;
		}
		// down arrow => fall faster
		if (ev.keyCode === 40) {
			ninjaPhysicalBody.speed.y = speed;
		}
		
		//Ninja's coordinatesX to be in the canvas only
		if((ninjaPhysicalBody.coordinates.x > (gameWalkingLine * 2))) {
			ninjaPhysicalBody.speed.x = -speed * 1.3;
			} else if (ninjaPhysicalBody.coordinates.x <= 40) {
			ninjaPhysicalBody.speed.x = +speed * 1.3;
		}
	});

	let background = createBackground();

	let gravity = gameGravity(gameWalkingLine);

	function gameLoop() {
		gravity.applyGravityVerticalY(ninjaPhysicalBody, 0.15);
		gravity.removeAccelerationHorizontalX(ninjaPhysicalBody, 0.1);

		let lastNinjaCoordinates = ninjaPhysicalBody.move();
		ninjaSprite.render(ninjaPhysicalBody.coordinates, lastNinjaCoordinates);
		ninjaSprite.update();

		background.render();
		background.update();

		window.requestAnimationFrame(gameLoop);
	}

	gameLoop();
});
