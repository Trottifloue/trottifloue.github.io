

class Engine{

  canvas
  ctx
  isGameRunning = true

  character
  blocks = []
  

  oldTime = 0
  newTime = 0
  delta

  gravity = 400

  gameLoop(actualTime){

    if(Engine.engine.isGameRunning){
    requestAnimationFrame(Engine.engine.gameLoop)
    }else{
      Engine.engine.gameOver()
      return
    }
    
    Engine.engine.oldTime = Engine.engine.newTime
    Engine.engine.newTime  = actualTime

    Engine.engine.delta = (Engine.engine.newTime - Engine.engine.oldTime)/1000 

    Engine.engine.tick()
    Engine.engine.draw()
  }
  draw(){
  
    Engine.engine.ctx.clearRect(0,0,canvas.width, canvas.height)
    Engine.engine.player.draw()

    for(let i = 0; i<Engine.engine.blocks.length; i++){
      Engine.engine.blocks[i].draw()
    }
  
  }
  
  tick(){
    Engine.engine.player.move()

    for(let i = Engine.engine.blocks.length-1; i>=0; i--){
      Engine.engine.blocks[i].move()
    }

    Block.spawn(Engine.engine.delta)

    if(Engine.engine.player.detectCollision()){
      Engine.engine.isGameRunning = false
    }
  }
  
  play(){
    Engine.engine.canvas = document.getElementById("canvas")
    Engine.engine.ctx = Engine.engine.canvas.getContext("2d")
  
    let drawPlayer = function(){
      Engine.engine.ctx.fillStyle = 'green'
      Engine.engine.ctx.fillRect(this.location.x, this.location.y, this.dimension.x, this.dimension.y)
    }
  
    Engine.engine.player = new Player(drawPlayer, 150,150, 800, 1800, true)
    Engine.engine.gameLoop(performance.now())
  }

  gameOver(){

    let button = Engine.engine.canvas.parentNode.appendChild(document.createElement('button'))
    button.classList.add("button")
    button.innerHTML = `Game over,<br>retry ?`
    button.id= "button"
    button.addEventListener("click", function(){
      console.log("test")
      Engine.createEngine()
    })
  }

  doSquareCollide(a, b){

    let isAllignedYAxis = (a.location.y + a.dimension.y>b.location.y) && (b.location.y+b.dimension.y>a.location.y)
    let isAllignedXAxis = (a.location.x + a.dimension.x>b.location.x) && (b.location.x+b.dimension.x>a.location.x)
    if(isAllignedXAxis && isAllignedYAxis){
      return true
    }
    return false  
  }

  static createEngine(){
    Engine.engine = new Engine()

    document.getElementById("button").remove()


    Engine.engine.play()
  }




  constructor(){
    this.oldTime = performance.now()
    this.newTime = this.oldTime
  }
}