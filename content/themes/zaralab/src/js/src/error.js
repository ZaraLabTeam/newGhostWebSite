(function() {


	var canvas = document.getElementById("canvas");
	if (!canvas) {
		return null;
	}

	var ctx = canvas.getContext("2d");
	var doncho = new Object("/content/images/GameImg/zara.png", 50, 400, 80, 100);
	var numcafe = 1;
	var cafe = new Array();
	var numcola = 5;
	var cola = new Array();
	for (var i = 0; i < numcola; i++) {
		cola[i] = new Object("/content/images/GameImg/green.png", Math.floor((Math.random() * 800) + 1), Math.floor((Math.random() * 1000) + 10), 20, 20);
	}
	var numie = 3;
	var ie = new Array();
	for (var i = 0; i < numie; i++) {
		ie[i] = new Object("/content/images/GameImg/black.png", Math.floor((Math.random() * 800) + 1), Math.floor((Math.random() * 1000) + 10), 20, 20);
	}
	var counter = 0;
	var levelcounter = 1;
	var isLeft = false;
	var isRight = false;
	var isSpace = false;
	var isShoot = false;
	var isA = false;
	var isD = false;

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



	$(document).ready(function() {
		$("#flip").click(function() {
			var panel = $("#panel").slideDown(2000);


			var timer;
			timer = setTimeout(function() {
				MainLoop();
				window.scrollTo(0, $("#panel").offset().top);
			}, 2050);

			function MainLoop() {



				//Pre-Adjustment
				doncho.X += doncho.Velocity_X;
				if (doncho.X > 800)(doncho.Velocity_X = 0);
				for (var i = 0; i < numcola; i++) {
					cola[i].Y += cola[i].Velocity_Y;
				}
				for (var i = 0; i < numie; i++) {
					ie[i].Y += ie[i].Velocity_Y;
				}
				//Draw
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = "green";
				ctx.font = "30px Arial";
				ctx.fillText("Score: " + counter, 10, 40);
				ctx.font = "30px Arial";
				ctx.fillText("Level: " + levelcounter, 680, 40);
				ctx.drawImage(doncho.Sprite, doncho.X, doncho.Y);
				for (var i = 0; i < numcola; i++) {
					ctx.drawImage(cola[i].Sprite, cola[i].X, cola[i].Y);
				}
				for (var i = 0; i < numie; i++) {
					ctx.drawImage(ie[i].Sprite, ie[i].X, ie[i].Y);
				}
				//Logic
				if (isLeft) {
					doncho.Velocity_X = -4
				}
				if (isRight) {
					doncho.Velocity_X = 4
				}
				if (!isLeft && !isRight) {
					doncho.Velocity_X = 0
				}
				if (doncho.X < 0) {
					doncho.X = 0;
				}
				if (doncho.X > 720) {
					doncho.X = 720;
				}
				for (var i = 0; i < numie; i++) {
					if (ie[i].Y > 500) {
						ie[i].Velocity_Y = 1;
						ie[i].Y = Math.floor((Math.random() * 1) + 1);
						ie[i].X = Math.floor((Math.random() * 1000) + 1);
					}
					ie[i].Velocity_Y += 0.01;
					if (ie[i].isColliding(doncho)) {
						ie[i].Velocity_Y = 1;
						ie[i].Y = Math.floor((Math.random() * 1) + 1);
						ie[i].X = Math.floor((Math.random() * 1000) + 1);
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
						ie[i].Velocity_Y = 3.01;
						levelcounter = 2;
					}
					if (counter >= 40) {
						ie[i].Velocity_Y = 4.01;
						levelcounter = 3;
					}
					if (counter >= 60) {
						ie[i].Velocity_Y = 5.01;
						levelcounter = 4;
					}
					if (counter >= 80) {
						ie[i].Velocity_Y = 6.01;
						levelcounter = 5;
					}
				}
				for (var i = 0; i < numcola; i++) {
					if (cola[i].Y > 500) {
						cola[i].Velocity_Y = 1;
						cola[i].Y = Math.floor((Math.random() * 10) + 1);
						cola[i].X = Math.floor((Math.random() * 1000) + 1);
					}
					cola[i].Velocity_Y += 0.01;
					if (cola[i].isColliding(doncho)) {
						cola[i].Velocity_Y = 1;
						cola[i].Y = Math.floor((Math.random() * 10) + 1);
						cola[i].X = Math.floor((Math.random() * 1000) + 1);
						counter += 2;
					}
				}
				game = setTimeout(MainLoop, 1000 / 110);
			}

		});
	});



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