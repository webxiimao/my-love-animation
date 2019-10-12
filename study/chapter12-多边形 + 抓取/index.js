const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")


function clearCanvas(){
   context.clearRect(0, 0, canvas.width, canvas.height);
}

const edanaga = 100

let startPos = [ canvas.width / 2, canvas.height / 2 ]

const side = 8//边长
function drawRubberbandShape(side, edanaga, startPos){
   const angle = 360 / side//获取边的角度
   const ANGLESIZE = Math.PI / 180
   context.beginPath();
   for(let i = 0; i <= side; i++){
      
      let x = Math.cos(ANGLESIZE * i * angle) * edanaga
      let y = Math.sin(ANGLESIZE * i * angle)  * edanaga
      if(i == 0){
         context.moveTo(startPos[0] + x, startPos[1] + y);
      }else{
         context.lineTo(startPos[0] + x, startPos[1] + y);
      }
   }
   context.closePath();
   context.fill();
}

function canvasPos(x, y){
   const bbox = canvas.getBoundingClientRect()
   return {
      x : x - bbox.left * (canvas.width / bbox.width),
      y : y - bbox.top * (canvas.height / bbox.height)
   }
}

drawRubberbandShape(side, edanaga, startPos)

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


canvas.onmousedown = dragRubberbandShape
//抓起图形的代码
function dragRubberbandShape(loc){
   const { x, y } = canvasPos(loc.x, loc.y)
   if(context.isPointInPath(x, y)){
      setStartLoc(x, y)
      canvas.onmousemove = dragRubberbandShapeMove
      canvas.onmouseup = dragRubberbandShapeUp
   }
}

function dragRubberbandShapeMove(loc){
   clearCanvas()
   const { x, y } = canvasPos(loc.x, loc.y)
   const startLoc = getStartLoc()
   const moveX = startLoc.x - x
   const moveY = startLoc.y - y
   // debugger
   const pos = [startPos[0] - moveX, startPos[1] - moveY]
   drawRubberbandShape(side, edanaga, pos)
}

function dragRubberbandShapeUp(loc){
   canvas.onmousemove = null
   clearCanvas()
   const { x, y } = canvasPos(loc.x, loc.y)
   const startLoc = getStartLoc()
   const moveX = startLoc.x - x
   const moveY = startLoc.y - y
   startPos = [startPos[0] - moveX, startPos[1] - moveY]
   drawRubberbandShape(side, edanaga, startPos)
}

