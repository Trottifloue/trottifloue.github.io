let chain = "Je suis belle ce mardi vous ne pensez pas"
let numberByLine = 10

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


let marginUp = 5
let marginLeft = 5
let interline = 5

let font = new FontFace("traspolice", "url('alphabetancien.ttf')")
document.fonts.add(font);
font.load()


function convert(string){
  let words = string.toLowerCase().split(" ")

  for(let i=0; i<words.length; i++){
    let word = words[i]
    let wordArray = word.split("")
    wordArray = wordArray.reverse()
    wordReversed = wordArray.join('')
    words[i] = wordReversed

  }

  return words.join("")
}

function reverse(string, width){
  let reversed = []
  for(let i = 0; i<Math.ceil(string.length/width); i++){
    reversed.push(string.slice(i*width, (i+1)*width))
  }
  for(let i=0; i<reversed.length;i++){
    if(i%2==0){
      continue
    }
    let stringToReverse = reversed[i]
    let stringReversed = stringToReverse.split("").reverse().join("")
    reversed[i] = stringReversed
  }
  return reversed
}

function draw(table){

  ctx.font='60px "traspolice"'
  let canvasWidth = 0
  let measure = ctx.measureText("f")
  let maxHeight = 0
  for(let i = 0; i<table.length; i++){
    let line = table[i]
    const actualMeasure = ctx.measureText(line)

    actualWidth = actualMeasure.width
    canvasWidth = actualWidth>canvasWidth? actualWidth : canvasWidth
    canvas.width = canvasWidth+2*marginLeft

    actualHeight = actualMeasure.actualBoundingBoxAscent
    maxHeight= actualHeight>maxHeight? actualHeight:maxHeight
    canvas.height = (maxHeight+interline)*table.length + 2*marginUp

  }
  
  ctx.font='60px "traspolice"'
  for(let i = 0; i<table.length; i++){
    let line = table[i]
    ctx.fillText(line, marginLeft, i*(maxHeight+interline)+marginUp +maxHeight)
  }
}

function launch(){
  chain = document.getElementById("text").value
  numberByLine = document.getElementById("number").value
  const converted = convert(chain)
  const reversed = reverse(converted, numberByLine)
  console.log(reversed)
  draw(reversed)
}

document.getElementById("generate").addEventListener("click", launch)