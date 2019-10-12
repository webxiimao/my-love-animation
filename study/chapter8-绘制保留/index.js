const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

context.beginPath();
context.moveTo(100, 100);
context.lineTo(100, 200);
context.stroke();
let draw = context.getImageData(0, 0, canvas.width / 2, canvas.height / 2);
context.clearRect(0, 0, canvas.width, canvas.height);


context.beginPath();
context.moveTo(100, 100);
context.lineTo(200, 200);
context.stroke();

setTimeout(() => {
  context.putImageData(draw, 0, 0);
  
}, 2000);