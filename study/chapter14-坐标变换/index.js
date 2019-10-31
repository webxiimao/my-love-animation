const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

function canvasPos(x, y){
  const bbox = canvas.getBoundingClientRect()
  return {
    x : x - bbox.left * (canvas.width / bbox.width),
    y : y - bbox.top * (canvas.height / bbox.height)
 }
}

let imagedata = null

function clearCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function setCanvas(){
  imagedata = context.getImageData(0, 0, canvas.width, canvas.width);
}

function resetCanvas(){
  if(!imagedata){
    setCanvas()
  }
  context.putImageData(imagedata, 0, 0);
  
}

//多边形
class RubberbandShape{
  constructor(originPos){
    this.sides = 6//边长
    this.originPos = canvasPos(originPos.x, originPos.y)
    this.size = 0//长度
    this.angle = 0
  }

  _vectorLength(x, y){
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) )
  }

  _getAngle(){
    return (Math.PI * 2 ) / this.sides
  }

  _getAnglePoint(size, angle){
    let px = Math.cos(angle) * size
    let py = Math.sin(angle) * size
    return {
      px,
      py
    }
  }

  _draw(pos){
    const originPos = this.originPos
    const { x, y } = canvasPos(pos.x, pos.y)
    this.size = this._vectorLength((x - originPos.x), (y - originPos.y))
    this._drawShape()
  }

  _drawShape(){
    context.save();
    context.fillStyle='pink';
    this.drawPath(context)
    context.fill();
    context.restore();
  }

  drawPath(context){
    const { x, y } = this.originPos
    const angle = this._getAngle()
    const rotateAngle = this.angle
    const sides = this.sides
    const size = this.size
    context.save();
    context.translate(x, y);
    context.rotate(rotateAngle);
    context.beginPath();
    context.moveTo(size, 0);
    for(let i = 1; i < sides; i++){
      let ag = angle * i
      let { px, py } = this._getAnglePoint(size, ag)
      context.lineTo(px, py);
    }
    context.restore();
  }

  _getVetorCos(v1, v2){
    return (v1[0] * v2[0] + v1[1] * v2[1]) / (this._vectorLength(v1[0], v1[1]) * this._vectorLength(v2[0], v2[1]))
  }

  drawRotate(e){
    resetCanvas()
    const { x, y } = canvasPos(e.x, e.y)
    //向量从原点到鼠标位置
    const vectorMouse = [ x - this.originPos.x, y - this.originPos.y ]
    //向量标准值
    const vetorDefault = [ this.size, 0 ]
    //获取cos值
    const cosAngle = this._getVetorCos(vectorMouse, vetorDefault)
    //判断y轴的位置，如果是pos在y轴上面，则采用负的acos
    this.angle = (y > this.originPos.y) ? Math.acos(cosAngle) : -Math.acos(cosAngle)
    this._drawRotateShape()
  }
  _drawTestPoint(x,y){
    context.beginPath();
    context.arc(x, y, 10, Math.PI / 180 * 0, Math.PI / 180 * 360, true);
    context.fill();
  }
  //绘制图形旋转
  _drawRotateShape(){
    this._drawTestPoint(this.originPos.x, this.originPos.y)
    this._drawShape()
  }

  //根据内部存储的参数构建图形
  drawShape(){
    this._drawShape()
  }

  //获取外部的参数构建图形
  draw(e){
    this._draw(e)
  }
}

let shapePool = []
function drawType(e){
  const rubberbandShape = new RubberbandShape(e)
  canvas.onmousemove = function(e){
    resetCanvas()
    rubberbandShape.draw(e)
  }
  canvas.onmouseup = function(e){
    rubberbandShape.draw(e)
    shapePool.push(rubberbandShape)
    canvas.onmousemove = null
    canvas.onmouseup = null
    setCanvas()
  }
}

function editType(rubberbandShape, e){
  canvas.onmousemove = function(e){
    clearCanvas()
    shapePool.forEach(shape => {
      if(shape !== rubberbandShape){
        shape.drawShape()
      }
    })
    setCanvas()
    rubberbandShape.drawRotate(e)
  }
  canvas.onmouseup = function(e) {
    setCanvas()
    canvas.onmousemove = null
    canvas.onmouseup = null
  }
}

function fetchShapePool(e){
  let rubberbandShape = null
  const { x, y } = e
  shapePool.forEach(itemShape => {
    itemShape.drawPath(context)
    if(context.isPointInPath(x, y)){
      rubberbandShape = itemShape
      return
    }
  })
  return rubberbandShape
}

function main(){
  
  canvas.onmousedown = function(e){
    const rubberbandShape = fetchShapePool(e)
    if(!!rubberbandShape){
      editType(rubberbandShape, e)
      return 
    }
    drawType(e)
  }
}

main()