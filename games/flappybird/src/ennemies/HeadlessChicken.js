import { Engine } from "../Engine.js"

export class HeadlessChicken{
  color = "red"
  radius = 5
  location = {
    x:null,
    y:null
  }

  baseLocation = {
    x:null,
    y:null
  }

  time = 0

  value = 1
  collisionType = "circle"
  collisionReceiving = []
  collisionGiving = ["player", "defense"]

  timeCreated = null

  update(){

    this.time +=Engine.engine.delta
    return
  }

  draw(){
    let ctx = Engine.engine.ctx

    ctx.fillStyle = `hsl(${this.time*3*360}, 100%, 68%)`

    ctx.beginPath()
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI*2);
    ctx.fill()
  }

  tryToDelete(){return}


  onCollision(collider, data){
  }

  constructor(currentTime, baseLocation){
    this.timeCreated=currentTime

    this.baseLocation.x = baseLocation.x
    this.baseLocation.y = baseLocation.y
    this.location.x = baseLocation.x
    this.location.y = baseLocation.y
    Engine.engine.entities.push(this)
  }

}