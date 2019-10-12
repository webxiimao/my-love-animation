const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

//绘制网格
function drawGrid(context, stepx, stepy, color){
   // clearCanvas()
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

drawGrid(context, 10, 10)

context.beginPath();

context.moveTo(300, 300);

context.arcTo(100, 100, 50, 150, 15);
context.stroke();
