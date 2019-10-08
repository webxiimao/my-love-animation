const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

console.log(canvas.height);


function ConfigOpt(canvas){
  console.log(canvas.height);
  
  this.canvas = canvas
  this.side = 500
  this.cline = 10//等边三角形边长
  this.startPoint = [0, this.canvas.height / 2]//起始坐标
  this.centerPoint = [this.startPoint[0] + this.side * Math.cos(Math.PI / 6), this.startPoint[1] - this.side * Math.sin(Math.PI / 6)]//中间点坐标
  this.endPoint = [this.startPoint[0] + this.side * Math.cos(Math.PI / 6), this.startPoint[1] + this.side * Math.sin(Math.PI / 6)]//结束坐标
}

const Config = new ConfigOpt(canvas)


context.lineWidth=2;
context.lineCap='round';

context.beginPath()
context.moveTo(Config.startPoint[0] + Math.cos(Math.PI / 6) * Config.cline, Config.startPoint[1] - Math.sin(Math.PI / 6) * Config.cline);
context.quadraticCurveTo(Config.centerPoint[0], Config.centerPoint[1], Config.centerPoint[0], Config.centerPoint[1] + Config.cline);
context.quadraticCurveTo(Config.endPoint[0], Config.endPoint[1], Config.endPoint[0] - Math.cos(Math.PI / 6) * Config.cline, Config.endPoint[1] + Config.cline);
context.quadraticCurveTo(Config.startPoint[0], Config.startPoint[1], Config.startPoint[0] + Math.cos(Math.PI / 6) * Config.cline, Config.startPoint[1] - Math.sin(Math.PI / 12) * Config.cline);


context.stroke();


// context.closePath();












