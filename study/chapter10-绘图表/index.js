const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const eraseAllButton = document.getElementById("eraseAllButton")
const strokeStyleSelect = document.getElementById("strokeStyleSelect")
const guidewireCheckbox = document.getElementById("guidewireCheckbox")

let drawImageData

function clearCanvas(){
   context.clearRect(0, 0, canvas.width, canvas.height);
}

function isGuideWireChecked(){
   return guidewireCheckbox.checked
}
//绘制网格
function drawGrid(context, stepx, stepy, color){
   clearCanvas()
   context.save();
   context.lineWidth=0.5;
   context.strokeStyle='#e5e5e5';
   for(let i = stepx + 0.5; i < canvas.clientWidth; i += stepx){
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
      context.stroke();
   }
   for(let i = stepy + 0.5; i < canvas.clientWidth; i += stepy){
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
   }
   context.restore();
   
}

function canvasPos(x, y){
   const bbox = canvas.getBoundingClientRect()
   return {
      x : x - bbox.left * (canvas.width / bbox.width),
      y : y - bbox.top * (canvas.height / bbox.height)
   }
}

//初始位置
let startLoc = {
   x:null,
   y:null
}

function setStartLoc(x, y){
   startLoc = {x, y}
}

function getStartLoc(){
   return startLoc
}

function drawLine(start, end, color = strokeStyleSelect.value){  
   context.save();
   context.strokeStyle = color;
   context.beginPath();
   context.moveTo(start.x, start.y);
   context.lineTo(end.x, end.y);
   context.stroke();
   context.restore();
   
}

function saveCanvasData(){
   drawImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreCanvasData(){
   context.putImageData(drawImageData, 0, 0);
}

//绘制标注
function drawAnnotation(loc){
   context.save();
   context.strokeStyle='blue';
   context.lineWidth=0.3;
   context.beginPath();
   context.moveTo(0, loc.y);
   context.lineTo(canvas.width, loc.y);
   context.moveTo(loc.x, 0);
   context.lineTo(loc.x, canvas.height);
   context.stroke();
   context.restore();
   
}

canvas.onmousedown = function(loc){
   const { x, y } = canvasPos(loc.x, loc.y)
   setStartLoc(x, y)
   saveCanvasData()
   canvas.onmousemove = canvasMounseMove
   canvas.onmouseup = canvasMounseUp
}

function canvasMounseMove(loc){
   const currentPos = canvasPos(loc.x, loc.y)
   const startPos = getStartLoc()
   restoreCanvasData()
   drawLine(startPos, currentPos)
   if(isGuideWireChecked()){
      drawAnnotation(currentPos)
   }
}

function canvasMounseUp(loc){
   const currentPos = canvasPos(loc.x, loc.y)
   const startPos = getStartLoc()
   restoreCanvasData()
   drawLine(startPos, currentPos)
   canvas.onmousemove = null
}



eraseAllButton.onclick = function(){
   drawGrid(context, 10, 10)
}

function main(){
   drawGrid(context, 10, 10)
}


main()