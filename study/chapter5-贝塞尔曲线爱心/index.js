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
  this.start = [canvas.width / 2, canvas.height / 2]
  this.cp = [200, 100]
  this.end = [100, 200]
}



BezierLine.prototype.draw = function(timestamp){
  
  if(timestamp >= this.time)return false
  let current = timestamp / this.time;
  let v1 = [this.cp[0] - this.start[0], this.cp[1] - this.start[1]]
  let pv1 = [v1[0] * current, v1[1] * current];
  let p1 = [pv1[0] + this.start[0], pv1[1] + this.start[1]]
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(this.start[0], this.start[1]);
  let p2x = Math.pow((1 - current), 2) * this.start[0] + 2 * current * (1-current) * this.cp[0] + Math.pow(current, 2) * this.end[0]
  let p2y = Math.pow((1 - current), 2) * this.start[1] + 2 * current * (1-current) * this.cp[1] + Math.pow(current, 2) * this.end[1]
  let p2 = [p2x, p2y]
  context.quadraticCurveTo(p1[0], p1[1], p2[0], p2[1]);
  context.stroke();
  
  return true
}

let bezierLine = new BezierLine()

function drawLine(timestamp){
  if(bezierLine.draw(timestamp))window.requestAnimationFrame(drawLine)
  // bezierLine.draw()
}


function main(){
  window.requestAnimationFrame(drawLine)
}

main()
