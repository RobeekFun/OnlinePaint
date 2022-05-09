const startCanvas = document.getElementById("startCanvas");
const startCtx = startCanvas.getContext("2d");

startCanvas.width = 1920;
startCanvas.height = 500;

function renderStartCanvas(){
	startCtx.fillStyle = '#181818';
	startCtx.fillRect(0, 0, startCanvas.width, startCanvas.height);
}

function Particle(x, y){
	this.x = x;
	this.y = y;
	this.randomPointX = Math.floor(Math.random()*startCanvas.width)
	this.randomPointY = Math.floor(Math.random()*startCanvas.height)
	this.diffX = Math.abs(this.x - this.randomPointX)
	this.diffY = Math.abs(this.y - this.randomPointY)
}

Particle.prototype.draw = function(){
	startCtx.strokeStyle = '#262626';
	startCtx.lineWidth = 5;
	startCtx.strokeRect(this.x, this.y, 10, 10);
}

let particles = [];

for (let i = 0; i < 1; i++){
	particles.push(new Particle(Math.floor(Math.random()*startCanvas.width), Math.floor(Math.random()*startCanvas.height)))
}

function update(){
	for (let i = 0; i < particles.length; i++){
		if (particles[i].diffX >= 20){
			if (particles[i].x < particles[i].randomPointX){
				particles[i].x += 10
			}else if (particles[i].x > particles[i].randomPointX){
				particles[i].x -= 10
			}
		}
		if(particles[i].diffY >= 20){
			if (particles[i].y < particles[i].randomPointY){
				particles[i].y += 10
			}else if (particles[i].y > particles[i].randomPointY){
				particles[i].y -= 10
			}
		}
		if(particles[i].diffX <= 20 && particles[i].diffY <= 20){
			particles[i].randomPointX = Math.floor(Math.random()*startCanvas.width)
			particles[i].randomPointY = Math.floor(Math.random()*startCanvas.height)
			particles[i].diffX = Math.abs(particles[i].x - particles[i].randomPointX)
			particles[i].diffY = Math.abs(particles[i].y - particles[i].randomPointY)
		}
		particles[i].diffX = Math.abs(particles[i].randomPointX - particles[i].x)
		particles[i].diffY = Math.abs(particles[i].randomPointY - particles[i].y)
		particles[i].draw()
	}
}
renderStartCanvas();
setInterval(renderStartCanvas, 10000)

setInterval(update, 20);
