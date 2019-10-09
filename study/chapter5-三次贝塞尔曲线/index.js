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
  this.v1 = [76, -90]
  this.v2 = [173, 98]
  this.end = [canvas.width / 2, canvas.height / 2 + 162]
}



BezierLine.prototype.draw = function(timestamp){
  
  if(timestamp >= this.time)return false
  context.clearRect(0, 0, canvas.width, canvas.height);
  let current = timestamp / this.time;
  context.beginPath();
  context.moveTo(this.start[0], this.start[1]);
  let p1 = [this.start[0] + this.v1[0] * current, this.start[1] + this.v1[1] * current]
  // let p2 = [this.start[0] + this.v1[0] + this.v2[0] * current, this.start[1] + this.v1[1] + this.v2[1] * current]
  let p2x = Math.pow((1 - current), 2) * this.start[0]
      + 2 * current * (1 - current) * (this.start[0] + this.v1[0])
      + Math.pow(current, 2) * (this.start[0] + this.v1[0] + this.v2[0])
  let p2y = Math.pow((1 - current), 2) * this.start[1]
      + 2 * current * (1 - current) * (this.start[1] + this.v1[1])
      + Math.pow(current, 2) * (this.start[1] + this.v1[1] + this.v2[1])
  let p3x = Math.pow((1 - current), 3) * this.start[0] 
      + 3 * Math.pow((1-current), 2) * current * (this.start[0] + this.v1[0]) 
      + 3 * Math.pow(current, 2) * (1-current) * (this.start[0] + this.v1[0] + this.v2[0]) 
      + this.end[0] * Math.pow(current, 3)
  let p3y = Math.pow((1 - current), 3) * this.start[1] 
      + 3 * Math.pow((1-current), 2) * current * (this.start[1] + this.v1[1]) 
      + 3 * Math.pow(current, 2) * (1-current) * (this.start[1] + this.v1[1] + this.v2[1]) 
      + this.end[1] * Math.pow(current, 3)
  // if(timestamp <= 1000){
  // }
  
  context.bezierCurveTo(p1[0], p1[1], p2x, p2y, p3x, p3y);
  
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
