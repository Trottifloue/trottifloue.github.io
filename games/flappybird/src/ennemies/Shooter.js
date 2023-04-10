import { Engine } from "../Engine.js"
import { HeadlessChicken } from "./HeadlessChicken.js"

export class Shooter
{
  collisionType = "circle"
  collisionReceiving = ["ennemy"]
  collisionGiving = ["defense"]
  radius = 5

  time = 0
  timeSinceLast = 0

  monitored = []

  patern = {x:null, y:null}
  dataPaterns = {x:[],y:[]}
  baseLocation = {}
  location = {}
  
  constructor(location, paterns, dataPaterns, frequencies, speed)
  {

    this.baseLocation = {
      x:location.x,
      y:location.y
    }

    this.location.x = location.x
    this.location.y = location.y

    this.patern.x = paterns.x
    this.patern.y = paterns.y

    this.dataPaterns.x = dataPaterns.x
    this.dataPaterns.y = dataPaterns.y

    this.frequencies = frequencies
    this.speed = speed
    this.target = Engine.engine.player

    Engine.engine.entities.push(this)
  }

  update()
  {
    this.time+= Engine.engine.delta
    this.timeSinceLast+= Engine.engine.delta

    this.location.x = this.baseLocation.x + this.patern.x(...this.dataPaterns.x, this.time)
    this.location.y = this.baseLocation.y + this.patern.y(...this.dataPaterns.y, this.time)

    if(this.timeSinceLast>this.frequencies)
    {
      this.timeSinceLast-=this.frequencies

      let targetLocation = this.target.location

      let distance = Math.sqrt(Math.pythagor(this.location, targetLocation))
      console.log(distance)

      let xDir = (targetLocation.x - this.location.x)/distance
      let yDir = (targetLocation.y - this.location.y )/distance

      let chicken = new HeadlessChicken(this.time, {x:this.location.x, y:this.location.y})

      this.monitored.push({
        object : chicken,

        direction : {
          x:xDir,
          y:yDir
        }
      })


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

  draw()
  {
    let ctx = Engine.engine.ctx

    ctx.fillStyle = `cyan`

    ctx.beginPath()
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI*2);
    ctx.fill()
  }

  onCollision(collider, data)
  {
    return
  }
}