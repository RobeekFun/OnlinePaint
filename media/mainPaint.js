
// отримуємо канвас і контекст
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// ставимо розміри
canvas.width = 1400;
canvas.height = 700;
// для перевірки, чи натиснута кнопка мишки
let isMouseDown = false;
let rectangleFirstPoint;
let rectangleSecondPoint;
let isRectangleStarted = false;
let isFrame = false;
let pos = $("#canvas").offset();
let coords = [];

let menuValues = {
	color: "black",
	instrument: "brush",
	brushSize: 3,
	deleteSize: 3,
	frameSize: 3,
}

// малюємо фон
ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height)

function clear(){
	ctx.fillStyle = "white"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.beginPath();
}

function save(){
	localStorage.setItem('coords', JSON.stringify(coords));
}

function back(){
	for(let i = 0; i < coords.length; i++){
		if( !coords.length ){
			clearInterval(timer)
			ctx.beginPath();
			return;
		}
		let crd = coords[i];
		let e = {
			X: crd['0'],
			Y: crd['1'],
			color: crd['2'],
			brushSize: crd['3'],
			instrument: crd['4'],
			deleteSize: crd['5'],
			rectangleFirstPoint: crd['6'],
			rectangleSecondPoint: crd['7'],
			frameSize: crd['8'],
		}; 
		if (e.instrument == "brush" && e.instrument != "rectangle"){
			ctx.lineWidth = e.brushSize * 2;
		}else if (e.instrument == "railways"){
			ctx.lineWidth = e.brushSize;
		}
		if (e.instrument != "delete" && e.instrument != "rectangle"){
			ctx.strokeStyle = e.color;
		}else if (e.instrument == "delete"){
			ctx.strokeStyle = 'white';
		}
		if (e.instrument != "rectangle"){
			ctx.lineTo(e.X, e.Y);
			ctx.stroke();
		}
		
		if (e.instrument == "brush" && e.instrument != "rectangle"){
			if (e.instrument != "delete"){
				ctx.fillStyle = e.color;
			}else if (e.instrument == "delete"){
				ctx.fillStyle = "white";
			}
			
			ctx.beginPath();
			ctx.arc(e.X, e.Y, e.brushSize, 0, Math.PI*2, true);
			ctx.fill();
		}
		if(e.instrument == "rectangle"){
			if (e.frameSize == 0){
				ctx.fillStyle = e.color;
				ctx.fillRect(e.rectangleFirstPoint.x, e.rectangleFirstPoint.y, Math.abs(e.rectangleFirstPoint.x - e.rectangleSecondPoint.x), Math.abs(e.rectangleFirstPoint.y - e.rectangleSecondPoint.y))
			}else if(e.frameSize > 0){
				ctx.lineWidth = e.frameSize;
				ctx.strokeStyle = e.color;
				ctx.strokeRect(e.rectangleFirstPoint.x, e.rectangleFirstPoint.y, Math.abs(e.rectangleFirstPoint.x - e.rectangleSecondPoint.x), Math.abs(e.rectangleFirstPoint.y - e.rectangleSecondPoint.y))
			}
		}
		if (e.instrument != "rectangle"){
			ctx.beginPath();
			ctx.moveTo(e.X, e.Y);
		}
		
		if (e.instrument == "delete"){
			ctx.strokeStyle = "white";
			ctx.lineTo(e.X, e.Y);
			ctx.stroke();
			
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.arc(e.X, e.Y, e.deleteSize, 0, Math.PI*2, true);
			ctx.fill();
			
			ctx.beginPath();
			ctx.moveTo(e.X, e.Y);
		}
	}
}

canvas.addEventListener('mousedown', function(e){
	isMouseDown = true;
	if (rectangleFirstPoint == undefined && menuValues.instrument == "rectangle"){
		rectangleFirstPoint = {x: e.pageX - pos.left, y: e.pageY - pos.top};
		isRectangleStarted = true;
	}
	save();
});

canvas.addEventListener('mouseup', function(e){

	isMouseDown = false;
	ctx.beginPath();
	if(isRectangleStarted == true && menuValues.instrument == "rectangle"){
		rectangleSecondPoint = {x: e.pageX - pos.left, y: e.pageY - pos.top};	
		coords.push([e.pageX - pos.left, e.pageY - pos.top, menuValues.color, menuValues.brushSize, menuValues.instrument, menuValues.deleteSize, rectangleFirstPoint, rectangleSecondPoint, menuValues.frameSize]);
		rectangleFirstPoint = undefined;
		isRectangleStarted = false;
	}
	coords.push('mouseup');
});


canvas.addEventListener('mousemove', function(e){
	
	if ( isMouseDown ){
		if (isRectangleStarted && menuValues.instrument == "rectangle"){
			clear();
			back();
			if (menuValues.frameSize == 0){
				ctx.fillStyle = menuValues.color;
				ctx.fillRect(rectangleFirstPoint.x, rectangleFirstPoint.y, Math.abs(rectangleFirstPoint.x - (e.pageX - pos.left)), Math.abs(rectangleFirstPoint.y - (e.pageY - pos.top)));
			}else if(menuValues.frameSize > 0){
				ctx.lineWidth = menuValues.frameSize;
				ctx.strokeStyle = menuValues.color;
				ctx.strokeRect(rectangleFirstPoint.x, rectangleFirstPoint.y, Math.abs(rectangleFirstPoint.x - (e.pageX - pos.left)), Math.abs(rectangleFirstPoint.y - (e.pageY - pos.top)));
			}
		}
		
		coords.push([e.pageX - pos.left, e.pageY - pos.top, menuValues.color, menuValues.brushSize, menuValues.instrument, menuValues.deleteSize, {x: 0, y: 0}, {x: 0, y: 0}, menuValues.frameSize]);
		
		if ( menuValues.instrument == "brush"){
			ctx.lineWidth = menuValues.brushSize * 2;
			ctx.strokeStyle = menuValues.color;
			ctx.lineTo(e.pageX - pos.left, e.pageY - pos.top);
			ctx.stroke();

			ctx.fillStyle = menuValues.color;
			ctx.beginPath();
			ctx.arc(e.pageX - pos.left, e.pageY - pos.top, menuValues.brushSize, 0, Math.PI*2, true);
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(e.pageX - pos.left, e.pageY - pos.top)
		}else if(menuValues.instrument == "railways"){
			ctx.lineWidth = menuValues.brushSize;
			ctx.strokeStyle = menuValues.color;
			ctx.lineTo(e.pageX - pos.left, e.pageY - pos.top);
			ctx.stroke();

			ctx.fillStyle = menuValues.color;
			ctx.beginPath();
			ctx.arc(e.pageX - pos.left, e.pageY - pos.top, 0, 0, Math.PI*2, true);
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(e.pageX - pos.left, e.pageY - pos.top)
		}else if ( menuValues.instrument == "delete" ){
			ctx.strokeStyle = 'white';
			ctx.lineWidth = menuValues.deleteSize * 2
			ctx.lineTo(e.pageX - pos.left, e.pageY - pos.top);
			ctx.stroke();

			ctx.fillStyle = 'white';
			ctx.beginPath();
			ctx.arc(e.pageX - pos.left, e.pageY - pos.top, menuValues.deleteSize, 0, Math.PI*2, true);
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(e.pageX - pos.left, e.pageY - pos.top)
		}
	}
});

canvas.addEventListener("mouseover", function(e){
	isMouseDown = false;
});

$(".paintMenu > li > a").click(function(){
	if ($(this).attr("id") == "instruments" && $(".instruments").css("display") == "none"){
		$(".submenu").css("display", "none")
		$(".instruments").css("display", "flex")
	}else if ($(this).attr("id") == "instruments" && $(".instruments").css("display") != "none"){
		$(".instruments").css("display", "none")
	}

	if ($(this).attr("id") == "colors" && $(".colors").css("display") == "none"){
		$(".submenu").css("display", "none")
		$(".colors").css("display", "flex")
	}else if ($(this).attr("id") == "colors" && $(".colors").css("display") != "none"){
		$(".colors").css("display", "none")
	}

	if ($(this).attr("id") == "settings" && $(".settings").css("display") == "none"){
		$(".submenu").css("display", "none")
		$(".settings").css("display", "flex")
	}else if ($(this).attr("id") == "settings" && $(".settings").css("display") != "none"){
		$(".settings").css("display", "none")
	}
})

$(".instruments > li > a").click(function(){
	if ($(this).attr("id") != "deleteAll" && $(this).attr("id") != "frame"){
		menuValues.instrument = $(this).attr("id")
	}
});

$(".submenu > li > a").click(function(){
	$(".submenu > li > a").css('font-weight', 'normal')
	$(this).css('font-weight', 'bold')
});

$("#frame").click(function(){
	isFrame = true;
	menuValues.instrument = "rectangle";
})

$("#rectangle").click(function(){
	isFrame = false;
})


$("#deleteAll").click(function(){
	clear();
	coords = [];
});

$('.back').click(function(){
	coords = JSON.parse(localStorage.getItem('coords'));
	clear();
	back();
});

document.addEventListener('keydown', function(e){
	if (e.keyCode == 83){
		save();;
	}
})

function updateValues(){
	menuValues.brushSize = $("#brushSize").val();
	menuValues.deleteSize = $("#deleteSize").val();
	if(isFrame == false){
		menuValues.frameSize = 0;
	}else if(isFrame == true){
		menuValues.frameSize = $("#frameSize").val();
	}
	
	console.log(menuValues.frameSize)
	
	$(".info > .instrument").text(`Інструмент: ${menuValues.instrument}`);
	$(".info > .color").text(`Колір: ${menuValues.color}`);
	$(".info > .brushSize").text(`Розмір пензля: ${menuValues.brushSize}`);

	menuValues.color = $("#colorPicker").val()	

	pos = $("#canvas").offset();
}

setInterval(updateValues, 50);

$(".save").click(function(){
	let dataURL = canvas.toDataURL("image/jpeg");
	let link = document.createElement("a");
	link.href = dataURL;
	link.download = "your_image.jpg";
	link.click();

})