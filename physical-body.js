function createPhysicalBody(options) {
	function move() {
		//clone this.coordinates object
		let lastCoordinates = { x: this.coordinates.x, y: this.coordinates.y };

		this.coordinates.x += this.speed.x;
		this.coordinates.y += this.speed.y;

		return lastCoordinates;
	}

	function collidesWith(otherPhysicalBody) {
		// TODO
	}

	let physicalBody = {
		coordinates: options.coordinates,
		speed: options.speed,
		height: options.height,
		width: options.width,
		move: move
	};

	return physicalBody;
}