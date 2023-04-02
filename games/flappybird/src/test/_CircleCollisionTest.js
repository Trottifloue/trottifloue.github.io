import { Engine } from "../Engine.js"

export class CircleCollisionTest {
  collisionType = "circle"

  color = "blue"
  constructor(location, radius){
    this.location = {
      x:location.x,
      y:location.y
    },
    this.radius=radius

  }
  update(){
    
    let circles = Engine.engine.circleTest

    for(let i = 0; i<circles.length; i++){
      if(!Object.is(this, circles[i])){
        if(Engine.engine.doCollide(this, circles[i])){
          this.color = "yellow"
        }else{
          this.color="red"
        }
      }
    }
  }

  draw(){
    let ctx = Engine.engine.ctx

    ctx.fillStyle = this.color

    ctx.beginPath()
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI*2);
    ctx.fill()
  }
}