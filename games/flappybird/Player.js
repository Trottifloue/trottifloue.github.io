class Player{
  drawFct = null
  location = {x:0,y:0}
  velocity = {x:0,y:0}
  maxSpeed = 0
  acceleration = 0
  doMove = null
  jumpSpeed = -400
  friction = 80

  dimension = {
    x: 10,
    y:10
  }
  


  move(){
  let delta = Engine.engine.delta    
  let a = Input.inputList.KeyA? Input.inputList.KeyA : 0
  let d = Input.inputList.KeyD? Input.inputList.KeyD : 0

  let xMove = d - a


    this.velocity.x += delta*this.acceleration*xMove

    if(xMove ==0){
      this.velocity.x += Math.sign(this.velocity.x)*-this.friction*delta
    }

    this.velocity.x = Math.min(Math.max(this.velocity.x, -this.maxSpeed), this.maxSpeed)
    
    this.location.x += this.velocity.x*delta

    this.velocity.y += Engine.engine.gravity*delta
    if(Input.inputList.Space == 1){
      this.velocity.y = this.jumpSpeed
    }
  
    this.location.y += this.velocity.y*delta

    
  }

  draw(){
    this.drawFct()
  }

  constructor(drawFct, locationX, locationY, maxSpeed, acceleration, doMove){
    this.drawFct = drawFct
    this.location.x = locationX
    this.location.y = locationY
    this.maxSpeed = maxSpeed
    this.acceleration = acceleration
    this.doMove = doMove
  }

  detectCollision(){
    let blocks = Engine.engine.blocks

    for(let i = 0; i<blocks.length; i++){
      let block = blocks[i]

      let isAllignedYAxis = (block.location.y + block.dimension.y>this.location.y) && (this.location.y+this.dimension.y>block.location.y)
      let isAllignedXAxis = (block.location.x + block.dimension.x>this.location.x) && (this.location.x+this.dimension.x>block.location.x)
      if(isAllignedXAxis && isAllignedYAxis ){

        return true
      }
    }
    return false
  }

}