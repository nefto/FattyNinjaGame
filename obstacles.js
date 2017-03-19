function createObstacle(options){
    let boxes = [];
	
	let obstacle = {
		spriteSheets: options.spriteSheets,
        spriteSheet: options.spriteSheets[0],
		context: options.context,
		width: options.width,
		height: options.height,
		obstacleCrateYLine: options.obstacleCrateYLine,
		numberOfFrames: options.numberOfFrames,
		loopTicksPerFrame: options.loopTicksPerFrame,
		frameIndex: 0,
		loopTicksCount: 0,
		render: render,
		update: update,
		boxes: boxes,
		spawnBoxHurdle: spawnBoxHurdle,
		iterateBoxesArray: iterateBoxesArray
    };
    
	
	let clearOffset = 0;

    function render(drawCoordinates, clearCoordinates) {
		this.context.clearRect(
			clearCoordinates.x - clearOffset,
			clearCoordinates.y - clearOffset,
			this.width + clearOffset * 2,
			this.height + clearOffset * 2
		);

		this.context.drawImage(
			this.spriteSheet,
			this.frameIndex * this.width,
			0,
			this.width,
			this.height,
			drawCoordinates.x,
			drawCoordinates.y,
			this.width,
			this.height
		);
	}

	function update() {
		this.loopTicksCount += 1;

		if (this.loopTicksCount >= this.loopTicksPerFrame) {
			this.loopTicksCount = 0;
			this.frameIndex += 1;

			if (this.frameIndex >= this.numberOfFrames) {
				this.frameIndex = 0;
			}
		}
	}
	
	function spawnBoxHurdle() {
		let spawnChance = 0.01,
			spawnOffsetX = 200;

		if (Math.random() < spawnChance) {
			if (boxes.length) {
				var lastBox = boxes[boxes.length - 1];
				var newBox = createPhysicalBody({
					coordinates: { x: 1000, y: this.obstacleCrateYLine},
					speed: { x: -3, y: 0 },
					height: this.height,
					width: this.width
				});
				boxes.push(newBox);

			} else {
				boxes.push(createPhysicalBody({
					coordinates: { x: 1000, y: this.obstacleCrateYLine},
					speed: { x: -3, y: 0 },
					height: this.height,
					width: this.width
				}));
			}
		}
	}

	function iterateBoxesArray(){
		for (i = 0; i < this.boxes.length; i += 1) {

			box = this.boxes[i];

			// if out of game field, remove pokeball
			if (box.coordinates.x < -box.width) {
				this.boxes.splice(i, 1);
				i -= 1;
				continue;
			}

			let lastObstacleCrateCoordinates = box.move();
			this.render(box.coordinates, lastObstacleCrateCoordinates);
			this.update();

			// if (ninjaPhysicalBody.collidesWith(box.body)) {
			// 	alert("Game over!");
			// }
		}
	}

    return obstacle;
}