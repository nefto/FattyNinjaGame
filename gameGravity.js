function gameGravity(gameWalkingLine) {
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

	return {
		applyGravityVerticalY: applyGravityVerticalY,
		removeAccelerationHorizontalX: removeAccelerationHorizontalX
	};
}

