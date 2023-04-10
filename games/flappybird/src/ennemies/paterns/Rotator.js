import { Engine } from "../../Engine.js";
import { HeadlessChicken } from "../HeadlessChicken.js";

export class Rotator{
  time = 0
  timeSinceLast = 0
  
  monitored = []

  collisionType = "circle"
  collisionReceiving = []
  collisionGiving = []
  radius = 0  

  constructor(location, lineNumber, degreesRotation, frequencies, totalNumber, speed, lifespan)
  {
    this.location = location
    this.lineNumber = lineNumber
    this.frequencies = frequencies
    this.totalNumber = totalNumber
    this.rotation = (degreesRotation/180)*Math.PI
    this.speed = speed
    this.lifespan = lifespan

    this.linesAngle = []
    let angle = Math.PI*2/lineNumber
    for(let i = 0; i<lineNumber; i++)
    {
      this.linesAngle.push(angle*(1+i))
    }
    Engine.engine.entities.push(this)
  }

  update(){
    this.time += Engine.engine.delta
    this.timeSinceLast += Engine.engine.delta

    if(this.timeSinceLast>this.frequencies)
    {
      console.log("spawn")
      this.timeSinceLast-=this.frequencies
      for(let i = 0; i<this.linesAngle.length; i++)
      {
        let headless = new HeadlessChicken(this.time, {x:this.location.x, y:this.location.y})
        this.monitored.push({
          direction : {
            x: Math.cos(this.linesAngle[i]),
            y: Math.sin(this.linesAngle[i])
          },
          object : headless
        })

        this.linesAngle[i]+=this.rotation
      }
    }
    this.moveMonitored()

  }

  moveMonitored()
  {
    
    for(let i = this.monitored.length-1;i>=0; i--)
    {
      let value = this.monitored[i]

      value.object.location.x+=value.direction.x*Engine.engine.delta*this.speed
      value.object.location.y+=value.direction.y*Engine.engine.delta*this.speed

      if(value.object.time>this.lifespan)
      {
        let index = Engine.engine.entities.indexOf(value.object)
        let index2 = this.monitored.indexOf(value)
        if(index>=0){
          Engine.engine.entities.splice(index, 1)
        }
        if(index2>=0){
          this.monitored.splice(index2, 1)
        }
      }
    }
  }

  draw(){return}

  onCollision(collider, data){
    return
  }
}