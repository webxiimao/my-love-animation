const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

context.font='48px Helvetica';
context.strokeStyle='blue';

//----text
context.strokeText("Stroke", 60, 100);
context.fillText("Fill", 440, 100);
//----end

//----rect
context.lineWidth=5;
context.beginPath();
context.rect(60, 150, 150, 100);
context.stroke();

context.beginPath();
context.rect(400, 150, 150, 100);
context.fill();

//----arc
context.beginPath();
context.arc(60, 370, 60, 0, Math.PI / 180 * 270, false);
context.stroke();

context.beginPath();
context.arc(400, 370, 60, 0, Math.PI / 180 * 270, false);
context.fill();

//----arc-close
context.beginPath();
context.arc(60, 550, 60, 0, Math.PI / 180 * 270, false);
context.closePath();
context.stroke();

context.beginPath();
context.arc(400, 550, 60, 0, Math.PI / 180 * 270, false);
context.closePath();
context.fill();


