(function() {


	var canvas = document.getElementById("canvas");
	if (!canvas) {
		return null;
	}

	var ctx = canvas.getContext("2d");
	var zara = new Object("/content/images/GameImg/zara.png", 50, 400, 80, 100);
	var numgreen = 5;
	var green = new Array();
	for (var i = 0; i < numgreen; i++) {
		green[i] = new Object("/content/images/GameImg/green.png", Math.floor((Math.random() * 800) + 1), Math.floor((Math.random() * 1000) + 10), 20, 20);
	}
	var numblack = 3;
	var black = new Array();
	for (var i = 0; i < numblack; i++) {
		black[i] = new Object("/content/images/GameImg/black.png", Math.floor((Math.random() * 690) + 1), Math.floor((Math.random() * 1000) + 10), 20, 20);
	}
	var counter = 0;
	var levelcounter = 1;
	var isLeft = false;
	var isRight = false;
	var isSpace = false;
	var isA = false;
	var isD = false;
	var gameRunning = false;


	//Press
	function APressed() {
		isA = true


	}

	function DPressed() {
		isD = true


	}

	function leftArrowPressed() {
		isLeft = true


	}

	function rightArrowPressed() {
		isRight = true

	}

	function spacePressed() {
		isSpace = true
	}
	document.onkeydown = function(evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37:
				leftArrowPressed();
				break;
			case 39:
				rightArrowPressed();
				break;
			case 89:
				spacePressed();
				break;
			case 65:
				APressed();
				break;
			case 68:
				DPressed();
				break;
		}
	};
	//Relase
	function ARelased() {
		isA = false
	}

	function DRelased() {
		isD = false
	}

	function leftArrowRalased() {
		isLeft = false
	}

	function rightArrowRalased() {
		isRight = false
	}

	function spaceRelased() {
		isSpace = false
	}
	document.onkeyup = function(evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37:
				leftArrowRalased();
				break;
			case 39:
				rightArrowRalased();
				break;
			case 89:
				spaceRelased()
				break;
			case 65:
				ARelased();
				break;
			case 68:
				DRelased();
				break;
		}
	};

	function preAdjustment() {
		zara.X += zara.Velocity_X;
		if (zara.X > 800)(zara.Velocity_X = 0);
		for (var i = 0; i < numgreen; i++) {
			green[i].Y += green[i].Velocity_Y;
		}
		for (var i = 0; i < numblack; i++) {
			black[i].Y += black[i].Velocity_Y;
		}
	}


	$(document).ready(function() {
		var panel = $("#panel");

		$("#flip").click(function() {
			$("#flip").slideUp(2000);
			if(!gameRunning) {
				panel.slideDown(2000);
				gameRunning = true;
			}

			var timer;
			timer = setTimeout(function() {
				MainLoop();
				window.scrollTo(0, $("#panel").offset().top);
			}, 2050);

		});
	});

			function MainLoop() {


				preAdjustment();

				//Draw
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = "green";
				ctx.font = "30px Arial";
				ctx.fillText("Score: " + counter, 10, 40);
				ctx.font = "30px Arial";
				ctx.fillText("Level: " + levelcounter, 680, 40);
				ctx.drawImage(zara.Sprite, zara.X, zara.Y);
				for (var i = 0; i < numgreen; i++) {
					ctx.drawImage(green[i].Sprite, green[i].X, green[i].Y);
				}
				for (var i = 0; i < numblack; i++) {
					ctx.drawImage(black[i].Sprite, black[i].X, black[i].Y);
				}
				//Logic
				if (isLeft) {
					zara.Velocity_X = -4
				}
				if (isRight) {
					zara.Velocity_X = 4
				}
				if (!isLeft && !isRight) {
					zara.Velocity_X = 0
				}
				if (zara.X < 0) {
					zara.X = 0;
				}
				if (zara.X > 720) {
					zara.X = 720;
				}
				for (var i = 0; i < numblack; i++) {
					if (black[i].Y > 500) {
						black[i].Velocity_Y = 1;
						black[i].Y = Math.floor((Math.random() * 1) + 1);
						black[i].X = Math.floor((Math.random() * 1000) + 1);
					}

					black[i].Velocity_Y += 0.01;
					if (black[i].isColliding(zara)) {
						black[i].Velocity_Y = 1;
						black[i].Y = Math.floor((Math.random() * 1) + 1);
						black[i].X = Math.floor((Math.random() * 1000) + 1);
						counter = counter - 10;

						if (counter <= 0) {
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							ctx.font = "50px Arial";
							ctx.fillText("Game Over", 260, 250);
							ctx = false;
						}
					}

					//Levels
					if (counter >= 20) {
						black[i].Velocity_Y = 3.01;
						levelcounter = 2;
					}
					if (counter >= 40) {
						black[i].Velocity_Y = 4.01;
						levelcounter = 3;
					}
					if (counter >= 60) {
						black[i].Velocity_Y = 5.01;
						levelcounter = 4;
					}
					if (counter >= 80) {
						black[i].Velocity_Y = 6.01;
						levelcounter = 5;
					}
				}
				for (var i = 0; i < numgreen; i++) {
					if (green[i].Y > 500) {
						green[i].Velocity_Y = 1;
						green[i].Y = Math.floor((Math.random() * 10) + 1);
						green[i].X = Math.floor((Math.random() * 1000) + 1);
					}
					green[i].Velocity_Y += 0.01;
					if (green[i].isColliding(zara)) {
						green[i].Velocity_Y = 1;
						green[i].Y = Math.floor((Math.random() * 10) + 1);
						green[i].X = Math.floor((Math.random() * 1000) + 1);
						counter += 2;
					}
				}
				game = setTimeout(MainLoop, 1000 / 110);
			}

	//Pause
	var gamecounter = 0;

	function pauseGame() {
		game = clearTimeout(game);
		gamecounter = 0
	}

	function unpauseGame() {
		game = setTimeout(MainLoop, 1000 / 110);
		gamecounter++;
		if (gamecounter > 1) {
			game = clearTimeout(game);
		}
	}

	function Object(img, x, y, width, height) {
		this.Sprite = new Image();
		this.Sprite.src = img;
		this.X = x;
		this.Y = y;
		this.Width = width;
		this.Height = height;
		this.Previous_X;
		this.Previous_Y;
		this.Velocity_X = 0;
		this.Velocity_Y = 0;
		this.isColliding = function(obj) {
			if (this.X > obj.X + obj.Width) return false;
			if (this.X + this.Width < obj.X) return false;
			if (this.Y > obj.Y + obj.Height) return false;
			if (this.Y + this.Height < obj.Y) return false;
			return true;
		}
	}

})();