const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

context.lineWidth=1;

context.beginPath();
context.moveTo(50, 10);
context.lineTo(450, 10);
context.stroke();

context.beginPath();
context.moveTo(50.5, 50.5);
context.lineTo(450.5, 50.5);
context.stroke();
