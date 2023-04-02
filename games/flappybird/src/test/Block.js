import { Engine } from "../Engine.js"

export class Block{
  
  value = 10

  collisionType = "rect"
  collisionReceiving = ["ennemy"]
  collisionGiving = ["player", "defense"]

  static dimension = {
    x : 40,
    y : 30
  }

  static baseVelocity = -80


  static timerRunned = 0
  static targetedTime = 0

  static doWillCollide(location, inverted){
    let entities = Engine.engine.entities
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
    for(let i = 0; i<entities.length;i++){
      if(Engine.engine.doCollide(futureObject, entities[i])){
        return true
      }
    }
    return  false
  }


  draw(){
    Engine.engine.ctx.fillStyle = this.color;
    Engine.engine.ctx.fillRect(this.location.x, this.location.y, this.dimension.x, this.dimension.y)
  }

  update(){
    let delta = Engine.engine.delta
    this.location.x += this.velocity.x*delta
    this.location.y += this.velocity.y*delta

    this.tryToDelete()
  }

  tryToDelete(){

    let axis = ["x", "y"]
    let word = ["width", "height"]
    for(let i =0; i<axis.length; i++){
      if(this.direction[axis[i]] == 1 && this.location[axis[i]] + this.dimension[axis[i]]<0){
        let index = Engine.engine.entities.indexOf(this)
        Engine.engine.entities.splice(index, 1)
        return
      }else if(this.direction[axis[i]] == -1 && this.location[axis[i]]>Engine.engine.canvas[word[i]]){
        let index = Engine.engine.entities.indexOf(this)
        Engine.engine.entities.splice(index, 1)
        return
      }
    }
  }
  
  color = "red"

  static SimulateDImension(vectorDirection){
    let dimension = {}
    if(vectorDirection.y !==0){
      dimension.x = Block.dimension.y,
      dimension.y = Block.dimension.x
    }else{
      dimension.x = Block.dimension.x,
      dimension.y = Block.dimension.y
    }

    return dimension
  }

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
    Engine.engine.entities.push(this)

  }

  onCollision(collider, data){
  }

}