class Engine{

  canvas
  ctx
  isGameRunning = true

  character
  entities = []
  

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

    for(let i = 0; i<Engine.engine.entities.length; i++){
      Engine.engine.entities[i].draw()
    }


  
  }
  
  tick(){
    Engine.engine.player.update()

    for(let i = Engine.engine.entities.length-1; i>=0; i--){
      Engine.engine.entities[i].update()
    }

    Block.spawn(Engine.engine.delta)

    Engine.engine.handleCollision()

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

  doCircleCollide(a, b){

    let distancePow = Math.pythagor(a.location, b.location)
    let radius = Math.pow(a.radius+b.radius ,2)
    if(distancePow>radius){
      return false
    }
    return true
  }

  doRectAndCircleCollide(square, circle){
    
    if(circle.location.x<square.location.x + square.dimension.x + circle.radius && circle.location.x>square.location.x - circle.radius){//1
      if(circle.location.y<square.location.y + square.dimension.y && circle.location.y> square.location.y){ //2
        return true
      }
    }

    if(circle.location.y<square.location.y + square.dimension.y+circle.radius && circle.location.y>square.location.y-circle.radius){//3
      if(circle.location.x<square.location.x + square.dimension.x && circle.location.x> square.location.x){//4
        return true
      } 
    }

    let corner = [
      {
        x:square.location.x,
        y:square.location.y
      },
      {
        x:square.location.x+square.dimension.x,
        y:square.location.y
      },
      {
        x:square.location.x,
        y:square.location.y+square.dimension.y
      },
      {
        x:square.location.x+square.dimension.x,
        y:square.location.y+square.dimension.y
      }
    ]
    
    for(let i = 0; i<corner.length;i++){
      if(Math.pythagor(circle.location, corner[i])<Math.pow(circle.radius, 2)){
        return true
      }
    }
  }

  doCollide(a,b){

    if(a.collisionType == 'rect'){

      if(b.collisionType == "rect"){
        return Engine.engine.doSquareCollide(a,b)
      }else if(b.collisionType == "circle"){
        //a rect b circle
        return Engine.engine.doRectAndCircleCollide(a,b)
      }

    }else if(a.collisionType == "circle"){
      if(b.collisionType == "rect"){
        //a circle b rect
        return Engine.engine.doRectAndCircleCollide(b,a)
      }else if(b.collisionType == "circle"){
        //a circle b circle
        return Engine.engine.doCircleCollide(a, b)
      }
    }
  }

  static createEngine(){
    Engine.engine = new Engine()

    document.getElementById("button")?.remove()


    Engine.engine.play()
  }

  constructor(){
    this.oldTime = performance.now()
    this.newTime = this.oldTime
  }


  handleCollision(){
    let entities = Engine.engine.entities
    let player = Engine.engine.player

    let collisionType = ["collisionReceiving", "collisionGiving"]
    //player
    for(let i =entities.length-1; i>=0; i--){
      let tag = entities[i].collisionGiving.find(element => player.collisionReceiving.includes(element))
      if(tag != undefined){
        if(Engine.engine.doCollide(player, entities[i])){
          player.onCollision(entities[i], {channel : tag})
        }
      }
      for(let i =entities.length-1; i>=0; i--){
        let tag = entities[i].collisionReceiving.find(element => player.collisionGiving.includes(element))
        if(tag != undefined){
          if(Engine.engine.doCollide(player, entities[i])){
            entities[i].onCollision(player, {channel : tag})
          }
        }
      }
    }
    //entities
    for(let i = entities.length-1; i>=0; i--){
      //Collide
      let act = entities[i]
      let sliced = entities.slice(0, i-entities.length)
      for(let j = sliced.length-1; j>=0; j--){
        let doCollide = null
        let tag = act.collisionGiving.find(element => sliced[j].collisionReceiving.includes(element))
        if(tag!=undefined){
          let doCollide = Engine.engine.doCollide(act, sliced[j])
          if(doCollide){
            sliced[j].onCollision(act, {channel : tag})
          }
        }
        if(doCollide ===false){
          continue
        }
        tag = act.collisionReceiving.find(element => sliced[j].collisionGiving.includes(element))
        if(tag!=undefined){
          if(doCollide===null){
            doCollide = Engine.engine.doCollide(act, sliced[j])
            
          }
          if(doCollide){
            
            act.onCollision(sliced[j], {channel : tag})
          }
        }
      }
    }
  }
}