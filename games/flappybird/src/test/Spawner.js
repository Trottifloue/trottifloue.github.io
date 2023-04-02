import { Engine } from "../Engine.js"

export class Spawner{
    _class
    location
    timeElapsed = 0
    totalTime
    blinkingSpeed = 0.33

    dimension = {
      x:60,
      y:60
    }

    collisionReceiving = []
    collisionGiving = []

  constructor(_class, location, timer, dimension, ...parameters){
    this.totalTime = timer
    this._class = _class
    this.location = location
    this.parameters = [...parameters]
    this.dimension = dimension

    Engine.engine.entities.push(this)
  }

  update(){
    this.timeElapsed+=Engine.engine.delta

    if(this.timeElapsed>this.totalTime){
      new this._class(...this.parameters)
      let index = Engine.engine.entities.indexOf(this)
      Engine.engine.entities.splice(index, 1)
    }
  }

  draw(){
    let ctx = Engine.engine.ctx

    ctx.fillStyle = `rgba(255,255,255,${Math.sin(this.timeElapsed*Math.PI* this.blinkingSpeed)})`

    ctx.fillRect(this.location.x, this.location.y, this.dimension.x,this.dimension.y)
  }

  onCollision(collider, data){
    
  }
}