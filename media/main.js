// отримую канвас на початку головної сторінки
const mainCanvas = document.getElementById("mainCanvas");
const mainCtx = mainCanvas.getContext("2d");
// ставлю розміри
mainCanvas.width = 1920;
mainCanvas.height = 1080;

// замальовка канвасу
function renderCanvas(){
	mainCtx.fillStyle = "#181818"
	mainCtx.fillRect(0,0,mainCanvas.width, mainCanvas.height);
}
// створюю об'єкт частинки
function Particle(x, y){
	this.x = x;
	this.y = y;
}
// функція малювання частинки
Particle.prototype.draw = function(){
	mainCtx.fillStyle = "#CACACA"
	mainCtx.beginPath();
	mainCtx.arc(this.x, this.y, 25, 25,  Math.PI*2, true);
	mainCtx.closePath();
	mainCtx.fill();
}
// масив для частинок
let particles = []

// створюю 100 частинок і записую їх у масив
for (let i = 0; i <= 100; i++){
	particles.push(new Particle(Math.floor(Math.random()*mainCanvas.width)-100, Math.floor(Math.random()*900)+800))
}
// функція, що обновляє канвас
function update(){
	// замальовуємо канвас
	renderCanvas();
	// отримуємо кожну частинку
	for(let i = 0; i <= 100; i++){
		// якщо піднімаються надто висото повертаємо назад
		if (particles[i].y < 700){
			particles[i].y = Math.floor(Math.random()*900)+1200
			// інакше з різною швидкістю піднімаємо до верху
		}else{
			particles[i].y -= Math.floor(Math.random()*5);
		}
		// малюємо
		particles[i].draw();
	}
}
// постійно викликаємо функцію update
setInterval(update, 60);


// mainCanvas.addEventListener("mousemove", setMousePosition, false);

// function setMousePosition(e) {
//   var mouseX = e.clientX;
//   var mouseY = e.clientY;
//   circle(mouseX, mouseY);
// }
