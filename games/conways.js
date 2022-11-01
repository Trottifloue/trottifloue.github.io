const button = document.getElementById("button")
const input = document.getElementById("input")
const form = document.getElementById("form")

let resolution

let maxCellX
let maxCellY

let canvasX
let canvasY

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

let oldTimer = 0
let newTimer = 0
let timeSinceUpdate = 0
let timeBetweenUpdate = 500

const voisins = getVoisin()

let array

function getVoisin(){
  const voisins = []
  const direction = [-1, 0, 1]
  for(let i = 0; i<direction.length; i++){
    for(let j = 0; j<direction.length; j++){
      if(direction[i] == 0 && direction[j] ==0){
        continue
      }
      voisins.push( [direction[i], direction[j]] )
    }
  }

  return voisins
}

function clearCanvas(){
  ctx.fillStyle = "black"
  ctx.fillRect(0,0, canvasX, canvasY)
}

function anim(){
  oldTimer = newTimer
  newTimer = performance.now()
  const delta = newTimer - oldTimer
  requestAnimationFrame(anim)
  timeSinceUpdate+=delta

  if(timeSinceUpdate >= timeBetweenUpdate){
    timeSinceUpdate-=timeBetweenUpdate

    clearCanvas()
    drawCells()
    array = simulate(array)
  }
}

function setupArray(){
  const array =new Array(canvasX*canvasY) 
  array.fill(false)
  return array
}

function getCell(x,y, array){
  if(x<maxCellX && y<maxCellY){
    return array[x*maxCellY + y]
  } else{
    return null
  }
}

function setCell(x,y, array, value){
  if(x<maxCellX && y<maxCellY){
    array[x*maxCellY + y] = value
    return true
  } else{
    return false
  }
}

button.addEventListener("click",()=>{

  resolution = parseInt(input.value)
  if(!isNaN(resolution)){
    const maxX = window.innerWidth
    const maxY = window.innerHeight

    maxCellX = Math.trunc(maxX/resolution)
    maxCellY = Math.trunc(maxY/resolution)

    form.parentNode.removeChild(form)

    document.body.appendChild(canvas)

    canvasX = maxCellX*resolution
    canvasY = maxCellY*resolution

    canvas.width = canvasX
    canvas.height = canvasY

    newTimer = performance.now()
    array = setupArray()

    setCell(1,1, array, true)
    setCell(1,2, array, true)
    setCell(1,3,array, true)
    setCell(2,3,array, true)
    anim()

  }
})

function drawCell(x,y){
  
  ctx.fillRect(x*resolution, y*resolution, resolution, resolution)
}

function drawCells(){
  ctx.fillStyle="white"
  for(let i = 0; i<maxCellX; i++){
    for(let j = 0; j<maxCellY; j++){
      if(getCell(i,j, array)===true){
        drawCell(i,j)
      }
    }
  }
}

function getAdj(x,y, array){
    const list = []
    for(let i = 0; i<voisins.length; i++){
      list.push(getCell(x + voisins[i][0], y + voisins[i][1], array ))
    }
    return list
}


function simulate(array){

  const newArray = setupArray()

  for(let i = 0; i<maxCellX; i++){
    for(let j = 0; j<maxCellY; j++){
      const list = getAdj(i,j, array)
      let aliveCell = 0
      for(let k = 0; k < list.length; k++){
        if(list[k] === true){
          aliveCell++
        }

      const isAlive = getCell(i,j, array)
      if(isAlive){
        if(aliveCell === 2 || aliveCell === 3){
          setCell(i,j,newArray, true)
        }else{
          setCell(i,j,newArray, false)
        }
      }else{
        if(aliveCell === 3 ){
          setCell(i,j,newArray,true)
        }else{
          setCell(i,j,newArray, false)
        }
      }
      }
    }
  }

  return newArray
}