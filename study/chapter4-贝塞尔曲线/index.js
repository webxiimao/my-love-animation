const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")


// context.beginPath();
// //302,132 378,42 551,140 310,295
// context.moveTo(302, 132);

// context.bezierCurveTo(378, 42, 551, 140, 302, 295);

// context.moveTo(302, 132);
// context.bezierCurveTo(226, 42, 53, 140, 302, 295);


// context.stroke();
const Config = {
  time: 3,//s
  size: 100
}

function BezierLine(){
  this.time = Config.time * 1000;
  this.size = Config.size
}

BezierLine.prototype.draw = function(timestamp){
  console.log(timestamp);
  
  if(timestamp >= this.time)return false
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(canvas.width / 2, 0);
  let pt = timestamp / this.time;
  let currentSize = pt * this.size;
  context.lineTo(canvas.width / 2, currentSize);
  context.stroke();
  
  return true
}

let bezierLine = new BezierLine()

function drawLine(timestamp){
  if(bezierLine.draw(timestamp))window.requestAnimationFrame(drawLine)
}


function main(){
  window.requestAnimationFrame(drawLine)
}

main()
