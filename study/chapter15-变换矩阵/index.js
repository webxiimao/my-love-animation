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

function main(){
  context.beginPath();
  context.transform(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4),100,100);
  context.fillStyle='green';
  context.rect(100, 100, 50, 70);
  context.fill();
  
}


main()

