import { Engine } from "./Engine.js"

export class Shockwave{
  collisionType = "circle"
  radius = 0
  collisionReceiving = ["defense"]
  collisionGiving = []
  location //by ref
  minRadius
  maxRadius
  time = 0

  target


  constructor(target, maxRadius, minRadius, time){
    this.target = target
    this.location = {
      x: target.location.x,
      y: target.location.y
    }
    this.radius = minRadius
    this.minRadius = minRadius
    this.maxRadius = maxRadius
    this.maxTime = time

    Engine.engine.entities.push(this)
  }

  update(){

    if(this.time>this.maxTime){
      let index = Engine.engine.entities.indexOf(this)
      Engine.engine.entities.splice(index, 1)
    }

    let delta = Engine.engine.delta
    this.time+=delta
    this.radius = (this.time/this.maxTime)*(this.maxRadius-this.minRadius) + this.minRadius

    if(this.target.collisionType == "circle"){
      this.location = this.target.location
    }else{
      this.location.x = this.target.location.x + this.target.dimension.x/2
      this.location.y = this.target.location.y + this.target.dimension.y/2
    }

  }

  draw(){
    let ctx = Engine.engine.ctx
    ctx.strokeStyle = "purple"
    ctx.lineWidth = 15

    ctx.beginPath()
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI*2)
    ctx.stroke()
  }

  onCollision(collider, data){
    let index = Engine.engine.entities.indexOf(collider)
    Engine.engine.entities.splice(index, 1)

    Engine.engine.score++
  }
}