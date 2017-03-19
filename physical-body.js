function createPhysicalBody(options) {
	function move() {
		//clone this.coordinates object
		let lastCoordinates = { x: this.coordinates.x, y: this.coordinates.y };

		this.coordinates.x += this.speed.x;
		this.coordinates.y += this.speed.y;

		return lastCoordinates;
	}

	function collidesWith(otherPhysicalBody) {
		if (this.coordinates.x < otherPhysicalBody.coordinates.x + otherPhysicalBody.width &&
				this.coordinates.x + this.width > otherPhysicalBody.coordinates.x &&
				this.coordinates.y < otherPhysicalBody.coordinates.y + otherPhysicalBody.height &&
				this.coordinates.y + this.height > otherPhysicalBody.coordinates.y){
			return true;
		}
	}

	let physicalBody = {
		coordinates: options.coordinates,
		speed: options.speed,
		height: options.height,
		width: options.width,
		move: move,
		collidesWith: collidesWith
	};

	return physicalBody;
}
