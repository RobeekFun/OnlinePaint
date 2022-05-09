const blogCanvas = document.getElementById("blogCanvas");
const blogCtx = blogCanvas.getContext("2d");

blogCanvas.width = 1920;
blogCanvas.height = 500;

function renderStartCanvas(){
	blogCtx.fillStyle = '#181818';
	blogCtx.fillRect(0, 0, blogCanvas.width, blogCanvas.height);
}

function Particle(x, y){
	this.x = x;
	this.y = y;
	this.randomPointX = Math.floor(Math.random()*blogCanvas.width)
	this.randomPointY = Math.floor(Math.random()*blogCanvas.height)
	this.diffX = Math.abs(this.x - this.randomPointX)
	this.diffY = Math.abs(this.y - this.randomPointY)
}

Particle.prototype.draw = function(){
	blogCtx.strokeStyle = '#262626';
	blogCtx.lineWidth = 5;
	blogCtx.strokeRect(this.x, this.y, 10, 10);
}

let particles = [];

// варіант багато крапок
for (let i = 0; i < 100; i++){
	particles.push(new Particle(Math.floor(Math.random()*blogCanvas.width), Math.floor(Math.random()*blogCanvas.height)))
}

function update(){
	renderStartCanvas();
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
			particles[i].randomPointX = Math.floor(Math.random()*blogCanvas.width)
			particles[i].randomPointY = Math.floor(Math.random()*blogCanvas.height)
			particles[i].diffX = Math.abs(particles[i].x - particles[i].randomPointX)
			particles[i].diffY = Math.abs(particles[i].y - particles[i].randomPointY)
		}
		particles[i].diffX = Math.abs(particles[i].randomPointX - particles[i].x)
		particles[i].diffY = Math.abs(particles[i].randomPointY - particles[i].y)
		particles[i].draw()
	}
}

setInterval(update, 20);
