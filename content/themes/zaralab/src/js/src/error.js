(function () {
	var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var doncho = new Object("/content/images/GameImg/doncho.png",50,400,80,100);
var nakov = new Object("/content/images/GameImg/peter.jpg",50,400,80,100);
var numcafe = 1;
var cafe = new Array();
for(var i = 0;i<numcafe;i++){
cafe[i] = new Object("/content/images/GameImg/coff_cup_icon_pitr-1979px.png",Math.floor((Math.random()*900)+1),Math.floor((Math.random()*1000)+10),50,50);}
var numcola = 5;
var cola = new Array();
for(var i = 0;i<numcola;i++){
cola[i] = new Object("/content/images/GameImg/coca-cola.png",Math.floor((Math.random()*900)+1),Math.floor((Math.random()*1000)+10),80,100);}
var numie = 3;
var ie= new Array();
for(var i = 0;i<numie;i++){
ie[i] = new Object("/content/images/GameImg/IE8.png",Math.floor((Math.random()*900)+1),Math.floor((Math.random()*1000)+10),50,50);}
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
function shootPressed() {
   isShoot = true
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
		case 32:
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
function shootRelased() {
   isShoot = false
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
		case 32:
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
MainLoop();
function MainLoop(){
//Pre-Adjustment
nakov.X += nakov.Velocity_X;
doncho.X += doncho.Velocity_X;
if(doncho.X > 900) (doncho.Velocity_X = 0);
if(nakov.X > 900) (nakov.Velocity_X = 0);
for(var i = 0; i<numcafe;i++) {
cafe[i].Y += cafe[i].Velocity_Y;}
for(var i = 0;i<numcola;i++){
cola[i].Y += cola[i].Velocity_Y;}
for(var i = 0;i<numie;i++){
ie[i].Y += ie[i].Velocity_Y;}
//Draw
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.font="30px Arial";
ctx.fillText("Score: "+counter,10,40);
ctx.font="30px Arial";
ctx.fillText("Level: "+levelcounter,760,40);
ctx.drawImage(doncho.Sprite,doncho.X,doncho.Y);
ctx.drawImage(nakov.Sprite,nakov.X,nakov.Y);
for(var i = 0;i<numcola;i++){
ctx.drawImage(cola[i].Sprite,cola[i].X,cola[i].Y);}
for(var i = 0;i<numie;i++){
ctx.drawImage(ie[i].Sprite,ie[i].X,ie[i].Y);}
for(var i = 0;i<numcafe;i++){
ctx.drawImage(cafe[i].Sprite,cafe[i].X,cafe[i].Y);}
//Logic
if(isLeft) {doncho.Velocity_X = -4}
if(isRight) {doncho.Velocity_X = 4}
if (!isLeft && !isRight) {doncho.Velocity_X = 0}
if(isA) {nakov.Velocity_X = -4}
if(isD) {nakov.Velocity_X = 4}
if (!isA && !isD) {nakov.Velocity_X = 0}
for(var i = 0;i<numie;i++){
	if(ie[i].Y > 500) {
		ie[i].Velocity_Y = 1;
		ie[i].Y = Math.floor((Math.random()*1)+1);
		ie[i].X = Math.floor((Math.random()*1000)+1);
						}
ie[i].Velocity_Y += 0.01;
	if(ie[i].isColliding(doncho)) {	
	    ie[i].Velocity_Y = 1;
		ie[i].Y = Math.floor((Math.random()*1)+1);
		ie[i].X = Math.floor((Math.random()*1000)+1);
		counter = counter - 10;
		if(counter <= 0) {
	    ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font="50px Arial";
		ctx.fillText("Game Over",300,250);
		ctx = false;
		} 
		}
		
		if(ie[i].isColliding(nakov)) {	
	    ie[i].Velocity_Y = 1;
		ie[i].Y = Math.floor((Math.random()*1)+1);
		ie[i].X = Math.floor((Math.random()*1000)+1);
		counter = counter - 10;
		if(counter <= 0) {
	    ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font="50px Arial";
		ctx.fillText("Game Over",300,250);
		ctx = false;
		} 
		}	
		//Levels
		if(counter >= 100) {
		ie[i].Velocity_Y = 3.01;
		levelcounter = 2;
		}
		if(counter >= 200) {
		ie[i].Velocity_Y = 4.01;
		levelcounter = 3;
		}
		if(counter >= 300) {
		ie[i].Velocity_Y = 5.01;
		levelcounter = 4;
		}
		if(counter >= 400) {
		ie[i].Velocity_Y = 6.01;
		levelcounter = 5;
		}
}
for(var i = 0;i<numcola;i++){
	if(cola[i].Y > 500) {
		cola[i].Velocity_Y = 1;
		cola[i].Y = Math.floor((Math.random()*10)+1);
		cola[i].X = Math.floor((Math.random()*1000)+1);
						}
cola[i].Velocity_Y += 0.01;
	if(cola[i].isColliding(doncho)) {	
	    cola[i].Velocity_Y = 1;
		cola[i].Y = Math.floor((Math.random()*10)+1);
		cola[i].X = Math.floor((Math.random()*1000)+1);
		counter++;}
    if(cola[i].isColliding(nakov)) {	
	    cola[i].Velocity_Y = 1;
		cola[i].Y = Math.floor((Math.random()*10)+1);
		cola[i].X = Math.floor((Math.random()*1000)+1);
		counter++;}
}
for(var i = 0;i<numcafe;i++){
	if(cafe[i].Y > 500) {
		cafe[i].Velocity_Y = 1;
		cafe[i].Y = Math.floor((Math.random()*10)+1);
		cafe[i].X = Math.floor((Math.random()*1000)+1);
						}
cafe[i].Velocity_Y += 0.01;
	if(cafe[i].isColliding(doncho)) {	
	    cafe[i].Velocity_Y = 1;
		cafe[i].Y = Math.floor((Math.random()*10)+1);
		cafe[i].X = Math.floor((Math.random()*1000)+1);
		counter = counter + 4;
}
	if(cafe[i].isColliding(nakov)) {	
	    cafe[i].Velocity_Y = 1;
		cafe[i].Y = Math.floor((Math.random()*10)+1);
		cafe[i].X = Math.floor((Math.random()*1000)+1);
		counter = counter + 4;
}
}
game = setTimeout(MainLoop, 1000/110);
}
//Pause
var gamecounter = 0;
	function pauseGame() {
	game = clearTimeout(game);
	gamecounter = 0} 
    function unpauseGame() {
    game = setTimeout(MainLoop, 1000/110);
	gamecounter++;
    if(gamecounter > 1){
	game = clearTimeout(game);
    }
 }
  
function Object(img,x,y,width,height){
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
this.isColliding = function(obj){
 if (this.X > obj.X + obj.Width) return false;
 if (this.X + this.Width < obj.X) return false;
 if (this.Y > obj.Y + obj.Height) return false;
 if (this.Y + this.Height < obj.Y) return false;
 return true;
}
}

})();