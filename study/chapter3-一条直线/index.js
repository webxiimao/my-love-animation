const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

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
