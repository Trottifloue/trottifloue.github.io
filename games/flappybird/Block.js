let direction = {
  Left : {
    x:-1,
    y:0
  },
  Right : {
    x:1,
    y:0
  },
  Down : {
    x:0,
    y:-1
  },
  Up : {
    x:0,
    y:1
  },
}

class Block{

  static dimension = {
    x : 40,
    y : 30
  }

  static baseVelocity = -80


  static timerRunned = 0
  static targetedTime = 0

  static spawn(time){
    
    Block.timerRunned +=time

    if(Block.timerRunned>Block.targetedTime){

      Block.timerRunned = 0
      Block.targetedTime = Math.random()
      let location
      let randDirection = Math.floor(Math.random()*4)

      if(randDirection == 0){
        
        do{
          location = {
            y : Math.random()*Engine.engine.canvas.height-Block.dimension.y,
            x : Engine.engine.canvas.width-1
          }
        }while(Block.doWillCollide(location, false))
        new CosBlock(location, direction.Right)
        
      }else if(randDirection == 1){
        
        do{
          location = {
            y : Math.random()*Engine.engine.canvas.height-Block.dimension.y,
            x : 0
          }
        }while(Block.doWillCollide(location, false))
        new CosBlock(location, direction.Left)
        
      }else if(randDirection == 2){
        
        do{
          location = {
            x : Math.random()*Engine.engine.canvas.width-Block.dimension.y,
            y : Engine.engine.canvas.height-1
          }
        }while(Block.doWillCollide(location, true))
        new CosBlock(location, direction.Up)
        
      }else if(randDirection == 3){
        
        do{
          location = {
            x : Math.random()*Engine.engine.canvas.width-Block.dimension.y,
            y : 0
          }
        }while(Block.doWillCollide(location, true))
        new CosBlock(location, direction.Down)
        
      }

    }
  }

  static doWillCollide(location, inverted){
    let blocks = Engine.engine.blocks
    let dimension
    
    if(inverted){
      dimension = {
        y:this.dimension.x,
        x:this.dimension.y}
    }else{
      dimension = this.dimension
    }
    let futureObject =  {
      dimension : dimension,
      location : location
    }
    for(let i = 0; i<blocks.length;i++){
      if(Engine.engine.doSquareCollide(futureObject, blocks[i])){
        return true
      }
    }
    return  false
  }


  draw(){
    Engine.engine.ctx.fillStyle = this.color;
    Engine.engine.ctx.fillRect(this.location.x, this.location.y, this.dimension.x, this.dimension.y)
  }

  move(){
    let delta = Engine.engine.delta
    this.location.x += this.velocity.x*delta
    this.location.y += this.velocity.y*delta

    this.tryToDelete()
  }

  tryToDelete(){
    if(this.location.x+this.dimension.x<0 || this.location.x>Engine.engine.canvas.width){
      let index = Engine.engine.blocks.indexOf(this)
      Engine.engine.blocks.splice(index, 1)
    }
  }
  
  color = "red"

  constructor(location, vectorDirection){
    this.direction = vectorDirection
    this.location = location
    this.velocity = {
      x : vectorDirection.x*Block.baseVelocity,
      y : vectorDirection.y*Block.baseVelocity
    }
    this.dimension = {}
    if(this.velocity.y !==0){
      this.dimension.x = Block.dimension.y,
      this.dimension.y = Block.dimension.x
    }else{
      this.dimension.x = Block.dimension.x,
      this.dimension.y = Block.dimension.y
    }
    Engine.engine.blocks.push(this)

  }
}