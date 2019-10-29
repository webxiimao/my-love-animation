const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

function canvasPos(x, y){
  const bbox = canvas.getBoundingClientRect()
  return {
     x : x - bbox.left * (canvas.width / bbox.width),
     y : y - bbox.top * (canvas.height / bbox.height)
  }
}

function clearCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

//贝塞尔曲线类
function Bezier(context){
  this.startPos = null//起始点
  this.p2 = null//第一个控制点
  this.p3 = null//第二个控制点
  this.endPos = null//终点
  this.markRadius = 5
  this.context = context
  this.marks = []
}

Bezier.prototype.changeStartPos = function(x, y){
  this.startPos = [x, y]
}

Bezier.prototype.changeP2 = function(x, y){
  this.p2 = [x, y]
}

Bezier.prototype.changeP3 = function(x, y){
  this.p3 = [x, y]
}

Bezier.prototype.changeEndPos = function(x, y){
  this.endPos = [x, y]
}

Bezier.prototype.draw = function(func){
  if(typeof func == "function"){
    func()
  }
  this._draw()
}

Bezier.prototype.getMarks = function(){
  return [ this.startPos, this.p2, this.p3, this.endPos ]
}

Bezier.prototype.createMark = function(pos){
  this._createMark(pos)
}

Bezier.prototype._draw = function(){
  const context = this.context
  //绘制4个标志点
  // debugger
  this._drawMark(this.startPos, "origin")
  this._drawMark(this.endPos, "origin")
  this._drawMark(this.p2, "control")
  this._drawMark(this.p3, "control")
  //绘制视图曲线
  context.beginPath();
  context.moveTo.apply(context, this.startPos)
  context.bezierCurveTo.apply(context, this.p2.concat( this.p3, this.endPos))
  context.stroke();
}

Bezier.prototype._createMark = function(pos){
  context.beginPath();
  context.arc(pos[0], pos[1], this.markRadius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
}

Bezier.prototype._drawMark = function(pos, type){
  const { color } = this._markType(type)
  context.save();
  context.fillStyle=color;
  this._createMark(pos, this.markRadius)
  context.fill();
  context.restore();
}

Bezier.prototype._markType = function(type){
  switch(type){
    case "origin":
      return {
        color:"red"
      }
    case "control":
      return {
        color:"green"
      }
  }
  return {}
}

//初始位置
let startLoc = {
  x:null,
  y:null
}

function setStartLoc(x, y){
  startLoc = {x, y}
}

function getStartLoc(){
  return startLoc
}


canvas.onmousedown = canvasMouseDown
let currentBezier = null

let currentMark = null


let marks = []

function canvasMouseDown(loc){
  canvas.onmousemove = null
  canvas.onmouseup = null
  const { x, y } = canvasPos(loc.x, loc.y)
  if(currentBezier){
    let flag = currentBezier.getMarks().some((markPos, index) => {
      currentBezier.createMark(markPos)
      if(context.isPointInPath(x, y)){
        currentMark = index
        canvas.onmousemove = canvasMarkMouseMove
        canvas.onmouseup = canvasMarkMouseUp
        return true
      }
      return false
    })
    if(flag)return
  }
  const bezier = new Bezier(context)
  currentBezier = bezier
  currentBezier.changeStartPos(x, y)
  setStartLoc(x, y)
  canvas.onmousemove = canvasMouseMove
  canvas.onmouseup = canvasMouseUp
}

function canvasMouseMove(loc){
  const { x, y } = canvasPos(loc.x, loc.y)
  const currentLoc = getStartLoc()
  currentBezier.changeP2(x, currentLoc.y)
  currentBezier.changeP3(currentLoc.x, y)
  currentBezier.changeEndPos(x, y)
  currentBezier.draw(function(){
    clearCanvas()
  })
}

function canvasMouseUp(loc){
  canvas.onmousemove = null
  const { x, y } = canvasPos(loc.x, loc.y)
  const currentLoc = getStartLoc()
  currentBezier.changeP2(x, currentLoc.y)
  currentBezier.changeP3(currentLoc.x, y)
  currentBezier.changeEndPos(x, y)
  currentBezier.draw(function(){
    clearCanvas()
  })
}

function canvasMarkMouseMove(loc){
  const { x, y } = canvasPos(loc.x, loc.y)
  if(currentMark == 0){
    currentBezier.changeStartPos(x, y)
    currentBezier._drawMark([x,y], "origin")
  }else if(currentMark == 1){
    currentBezier.changeP2(x, y)
    currentBezier._drawMark([x,y], "control")

  }else if(currentMark == 2){
    currentBezier.changeP3(x, y)
    currentBezier._drawMark([x,y], "control")

  }else if(currentMark == 3){
    currentBezier.changeEndPos(x, y)
    currentBezier._drawMark([x,y], "origin")
  }
  currentBezier.draw(function(){
    clearCanvas()
  })
}

function canvasMarkMouseUp(loc){
  canvas.onmousemove = null
  const { x, y } = canvasPos(loc.x, loc.y)
  if(currentMark.index == 0){
    currentBezier.changeStartPos(x, y)
    currentBezier._drawMark([x,y], "origin")
  }else if(currentMark.index == 1){
    currentBezier.changeP2(x, currentLoc.y)
    currentBezier._drawMark([x,y], "control")

  }else if(currentMark.index == 2){
    currentBezier.changeP3(currentLoc.x, y)
    currentBezier._drawMark([x,y], "control")

  }else if(currentMark.index == 3){
    currentBezier.changeEndPos(x, y)
    currentBezier._drawMark([x,y], "origin")
  }
  currentBezier.draw(function(){
    clearCanvas()
  })
}
