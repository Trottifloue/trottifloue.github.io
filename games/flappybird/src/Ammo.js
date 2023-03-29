import { Engine } from "./Engine.js"

export class Ammo{

  static timeToWait = 5
  static waitedTime = 9

  collisionType = "circle"
  radius = 15

  color = "green"
  constructor(location){
    this.location = {
      x:location.x,
      y:location.y
    }

  Engine.engine.entities.push(this)
  }

  collisionReceiving = ["powerUp"]
  collisionGiving = []

  update(){

  }

  draw(){
    let ctx = Engine.engine.ctx

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI*2)
    ctx.fill()
  }

  onCollision(collider, data){

    if(collider.ammo !==undefined && collider.ammo<collider.maxAmmo)[
      collider.ammo++
    ]
    let index = Engine.engine.entities.indexOf(this)
    Engine.engine.entities.splice(index, 1)
  }
}