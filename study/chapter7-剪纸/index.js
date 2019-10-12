const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

//由于context.rect没法控制绘制方向，于是需要自己手动开发一个rect函数
/**
 * 
 * @param {number} x x轴坐标
 * @param {number} y y轴坐标
 * @param {number} w 宽度
 * @param {number} h 高度
 * @param {boolean} direction 方向 false 顺时针， true 逆时针
 */
function rect(x, y, w, h, direction=false){
  context.moveTo(x, y);
  if(direction){
    context.lineTo(x, y + h);
    context.lineTo(x + w, y + h);
    context.lineTo(x + w, y);
  }else{
    context.lineTo(x + w, y);
    context.lineTo(x + w, y + h);
    context.lineTo(x, y + h);
  }
  context.closePath();
}

//外层大矩形 顺时针
function addOuterRectanglePath(){
  rect(10, 10, 500, 500, true)
}

//圆形
function addCirclePath(){
  context.arc(300, 300, 80, 0, Math.PI / 180 * 360, false);
  
}

//矩形
function addRectanglePath(){
  // context.beginPath();
  rect(110, 110, 100, 50, false)
}
//三角形
function addTrianglePath(){
  // context.beginPath();
  context.moveTo(300, 400);
  context.lineTo(400, 500);
  context.lineTo(300, 500);
  context.closePath();
}

function main(){
  context.beginPath();
  context.fillStyle='green';
  
  context.save();
  addOuterRectanglePath()
  
  addCirclePath()
  addRectanglePath()
  addTrianglePath()
  // context.stroke();
  context.fill();
  context.restore();
  
}

main()