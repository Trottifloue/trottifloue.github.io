class Block{

  static timerRunned = 0
  static targetedTime = 0

  static spawn(time){
    Block.timerRunned +=time

    if(Block.timerRunned>Block.targetedTime){
      Block.timerRunned = 0
      Block.targetedTime = Math.random()

      new Block({x:Engine.engine.canvas.width-1, y:Math.random()*Engine.engine.canvas.height-30})
      
    }
  }


  location = {
    x : 120,
    y : 120
  }
  dimension = {
    x : 40,
    y : 30
  }

  velocity = {
    x : -80,
    y : 0
  }


  draw(){
    Engine.engine.ctx.fillStyle = 'red';
    Engine.engine.ctx.fillRect(this.location.x, this.location.y, this.dimension.x, this.dimension.y)
  }

  move(){
    let delta = Engine.engine.delta
    this.location.x += this.velocity.x*delta

    this.tryToDelete()
  }

  tryToDelete(){
    if(this.location.x+this.dimension.x<0 || this.location.x>Engine.engine.canvas.width){
      let index = Engine.engine.blocks.indexOf(this)
      Engine.engine.blocks.splice(index, 1)
      console.log("deleted")
    }
  }

  constructor(location){
    this.location.x = location.x
    this.location.y = location.y
    Engine.engine.blocks.push(this)
  }
}