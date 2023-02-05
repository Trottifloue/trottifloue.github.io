
const result = document.getElementById("finalimage")
const auxImageDiv = document.getElementById("auxiliarimagediv")
const finalImageDiv = document.getElementById("finalimagediv")
let  imgArray = []
const dropDiv = document.getElementById("draganddrop")
const dimension = {width : null, height : null}
let canvasFinalImage

let clickData = {
  position : {x:null,y:null},
  canvas : null
}

document.addEventListener("dragover",function(e){
  e.preventDefault();
});
document.addEventListener("drop",function(e){
  e.preventDefault();
});

dropDiv.addEventListener("drop", (e)=>{
  e.preventDefault()
  e.stopPropagation()


  loadImageRecursive(e.dataTransfer.files, 0)
})

function loadImageRecursive(files, index){
  if(files.length<=index){
    return
  }
  createImageBitmap(files[index]).then((value)=>{
  
    let canvas
    if(imgArray.length == 0){
      canvasFinalImage = finalImageDiv.appendChild(document.createElement("canvas"))
      dimension.width = value.width
      dimension.height = value.height
      canvasFinalImage.width = value.width
      canvasFinalImage.height = value.height
      canvasFinalImage.setAttribute("id", "finalimage")

      let calc = finalImageDiv.appendChild(document.createElement("canvas"))
      calc.width = value.width
      calc.height = value.height
      calc.classList.add("finalcalc")
    }

    if(dimension.width == value.width && dimension.height == value.height){

      let div = auxImageDiv.appendChild(document.createElement("div"))
      div.classList.add("wrappercanvas")

      canvas = div.appendChild(document.createElement("canvas"))
      canvas.width = value.width
      canvas.height = value.height
      
      let calc = div.appendChild(document.createElement("canvas"))
      calc.width = value.width
      calc.height = value.height
      calc.classList.add("calc")

      

      canvas.classList.add("auxiliarimage")

      canvas.getContext("2d").drawImage(value, 0, 0)
      div.addEventListener("mousedown", onclickCanvas)
      imgArray.push({baseImg : value, canvas : canvas})

      loadImageRecursive(files, index+1)
    }else{
      console.log("error, not the good size")
      return
    }
    

  })
}

function endClick(e){
  clearCalc()

  if(clickData.target == null){return}
  let endPosition = {x : e.x - clickData.target.getBoundingClientRect().left, y : e.y - clickData.target.getBoundingClientRect().top}
  endPosition.x = clamp(0,dimension.width, endPosition.x)
  endPosition.y = clamp(0,dimension.height, endPosition.y)
  let find = imgArray.find(element => Object.is(element.canvas, clickData.target))
  if(find == undefined){return}

  let position = {
    x : endPosition.x<clickData.position.x? endPosition.x : clickData.position.x,
    y : endPosition.y<clickData.position.y? endPosition.y : clickData.position.y,
    width : endPosition.x>clickData.position.x? endPosition.x-clickData.position.x : clickData.position.x-endPosition.x,
    height : endPosition.y>clickData.position.y? endPosition.y-clickData.position.y : clickData.position.y-endPosition.y,
  }
  canvasFinalImage.getContext("2d").drawImage(find.canvas, position.x, position.y, position.width, position.height, position.x, position.y, position.width, position.height)

  clickData.position.x = null
  clickData.position.y = null
  clickData.target = null
}

function onclickCanvas(e){
  const canvas = e.target.parentNode.querySelector(".auxiliarimage")
  console.log(e)
  clickData.position.x = e.x - e.target.getBoundingClientRect().left
  clickData.position.y = e.y - e.target.getBoundingClientRect().top
  clickData.target = canvas
}

function mouseMove(e){
  clearCalc()

  if(clickData.target == null){return}

  let endPosition = {x : e.x - clickData.target.getBoundingClientRect().left, y : e.y - clickData.target.getBoundingClientRect().top}
  endPosition.x = clamp(0,dimension.width, endPosition.x)
  endPosition.y = clamp(0,dimension.height, endPosition.y)
  let find = imgArray.find(element => Object.is(element.canvas, clickData.target))
  if(find == undefined){return}

  let position = {
    x : endPosition.x<clickData.position.x? endPosition.x : clickData.position.x,
    y : endPosition.y<clickData.position.y? endPosition.y : clickData.position.y,
    width : endPosition.x>clickData.position.x? endPosition.x-clickData.position.x : clickData.position.x-endPosition.x,
    height : endPosition.y>clickData.position.y? endPosition.y-clickData.position.y : clickData.position.y-endPosition.y,
  }

  for(let i = 0; i<imgArray.length; i++){
    let element = imgArray[i]
    let calc = element.canvas.parentNode.querySelector(".calc")
    let ctx = calc.getContext("2d")
    ctx.fillStyle = "rgba(255,255,0,0.25)"
    ctx.fillRect(position.x, position.y, position.width, position.height)
  }

  let fnCtx = finalImageDiv.querySelector(".finalcalc").getContext("2d")
  fnCtx.fillStyle = "rgba(255,255,0,0.25)"
  fnCtx.fillRect(position.x, position.y, position.width, position.height)
}

document.body.addEventListener("mouseup", endClick)
document.body.addEventListener("mousemove", mouseMove)

function clamp(min, max, value){
  return Math.max(Math.min(max, value), min)
}

function clearCalc(){
  for(let i = 0; i<imgArray.length; i++){
    let element = imgArray[i]
    let calc = element.canvas.parentNode.querySelector(".calc")
    let ctx = calc.getContext("2d")
    ctx.clearRect(0, 0, calc.width, calc.height)
  }
  let fnCanvas = finalImageDiv.querySelector(".finalcalc")
  let fnCtx = fnCanvas?.getContext("2d")
  fnCtx?.clearRect(0, 0, fnCanvas.width, fnCanvas.height)

}