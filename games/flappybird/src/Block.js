import { Engine } from "./Engine.js"

import { Spawner } from "./Spawner.js"

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


export class Block{
  
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

  static spawn(time){
    Block.timerRunned +=time

    if(Block.timerRunned>Block.targetedTime){

      Block.timerRunned = 0
      Block.targetedTime = Math.random()
      let location
      let randDirection = Math.floor(Math.random()*4)
      let spawnerLocation = {
        x : null,
        y : null
      }
      let simulate

      if(randDirection == 0){
        
        do{
          location = {
            y : Math.random()*Engine.engine.canvas.height-Block.dimension.y,
            x : Engine.engine.canvas.width
          }

          simulate = Block.SimulateDImension(direction.Left)
          spawnerLocation = {
            x : location.x - simulate.x*direction.Right.x,
            y : location.y - simulate.y*direction.Right.y
          }
        }while(Block.doWillCollide(location, false))
        new Spawner(Block, spawnerLocation, 3, simulate, location, direction.Right)
    
        
      }else if(randDirection == 1){
        
        do{
          location = {
            y : Math.random()*Engine.engine.canvas.height-Block.dimension.y,
            x : 0-Block.dimension.x
          }

          simulate = Block.SimulateDImension(direction.Left)
          spawnerLocation = {
            x : location.x - simulate.x*direction.Left.x,
            y : location.y - simulate.y*direction.Left.y
          }
        }while(Block.doWillCollide(location, false))
        new Spawner(Block, spawnerLocation, 3, simulate, location, direction.Left)
        
      }else if(randDirection == 2){
        
        do{
          location = {
            x : Math.random()*Engine.engine.canvas.width-Block.dimension.y,
            y : Engine.engine.canvas.height
          }

          simulate = Block.SimulateDImension(direction.Up)
          spawnerLocation = {
            x : location.x - simulate.x*direction.Up.x,
            y : location.y - simulate.y*direction.Up.y
          }
        }while(Block.doWillCollide(location, true))
        new Spawner(Block, spawnerLocation, 3, simulate, location, direction.Up)
        
      }else if(randDirection == 3){
        
        do{
          location = {
            x : Math.random()*Engine.engine.canvas.width-Block.dimension.y,
            y : 0- Block.dimension.x
          }

          simulate = Block.SimulateDImension(direction.Down)
          spawnerLocation = {
            x : location.x - simulate.x*direction.Down.x,
            y : location.y - simulate.y*direction.Down.y
          }
        }while(Block.doWillCollide(location, true))
          new Spawner(Block, spawnerLocation, 3, simulate, location, direction.Down)
        }

    }
  }

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
        console.log("delete : ", this.direction)
        return
      }else if(this.direction[axis[i]] == -1 && this.location[axis[i]]>Engine.engine.canvas[word[i]]){
        let index = Engine.engine.entities.indexOf(this)
        Engine.engine.entities.splice(index, 1)
        console.log("delete : ", this.direction)
        return
      }
      if(this.location.x>1000){
        console.log(this.location.x, this.direction)
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
    console.log("test Block")
  }

}