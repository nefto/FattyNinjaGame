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
		speed: { x: 0, y: 0 },
		height: ninjaSprite.height,
		width: ninjaSprite.width
	});

	let gameWalkingLine = gameCanvas.height - (ninjaPhysicalBody.height * 2);

	let speed = 4;

	window.addEventListener('keydown', function (ev) {
		// left arrow => walk left
		if (ev.keyCode === 37) {
			ninjaPhysicalBody.speed.x = -speed;
		}
		// up arrow => jump
		if (ev.keyCode === 38) {
			if(ninjaPhysicalBody.coordinates.y < gameWalkingLine ) {
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
	});


	function applyGravityVerticalY(physicalBody, gravity) {
		if (physicalBody.coordinates.y === gameWalkingLine) {
			return;
		}

		if (physicalBody.coordinates.y > gameWalkingLine) {
			physicalBody.coordinates.y = gameWalkingLine;
			physicalBody.speed.y = 0;

			return;
		}

		physicalBody.speed.y += gravity;
	}

	function removeAccelerationHorizontalX(physicalBody, gravity) {
		if (physicalBody.speed.x > 0) {
			physicalBody.speed.x -= gravity;

			if (physicalBody.speed.x < 0) {
				physicalBody.speed.x = 0;
			}
		}

		if (physicalBody.speed.x < 0) {
			physicalBody.speed.x += gravity;

			if (physicalBody.speed.x > 0) {
				physicalBody.speed.x = 0;
			}
		}
	}

	function gameLoop() {
		applyGravityVerticalY(ninjaPhysicalBody, 0.15);
		removeAccelerationHorizontalX(ninjaPhysicalBody, 0.1);

		let lastNinjaCoordinates = ninjaPhysicalBody.move();
		ninjaSprite.render(ninjaPhysicalBody.coordinates, lastNinjaCoordinates);
		ninjaSprite.update();

		window.requestAnimationFrame(gameLoop);
	}

	gameLoop();
});