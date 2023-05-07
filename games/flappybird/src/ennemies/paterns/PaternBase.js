//Patern = {x:Function, y:Function avec un argument}

import { Engine } from "../../Engine.js";
import { HeadlessChicken } from "../HeadlessChicken.js";

export class PaternBase {
  time = 0
  timeSinceLast = 0
  monitored = []

  collisionType = "circle"
  collisionReceiving = []
  collisionGiving = []
  radius = 0

  constructor(number, interval, patern, paternTweak, beginLocation, lifespan, metapatern, metapaternTweak){
    this.numberToSpawn = number
    this.interval = interval
    this.base_location = {x:beginLocation.x, y:beginLocation.y}
    this.location = {x:beginLocation.x, y:beginLocation.y}

    this.patern = patern
    this.paternTweak = paternTweak? paternTweak: []
    this.chickenLifespan = lifespan

    this.metapatern = metapatern
    this.metapaternTweak = metapaternTweak? metapaternTweak: []

    Engine.engine.entities.push(this)
  }

  update(){
    let delta = Engine.engine.delta
    this.time+=delta
    this.timeSinceLast+=delta

    if(this.metapatern !== undefined){
      this.location.x = this.metapatern.x(...this.metapaternTweak.x, this.time) +this.base_location.x
      this.location.y = this.metapatern.y(...this.metapaternTweak.y, this.time) + this.base_location.y
    }

    if(this.timeSinceLast>this.interval && this.numberToSpawn>0){
      this.monitored.push(new HeadlessChicken(this.time, this.location))
      this.numberToSpawn--
      this.timeSinceLast-=this.interval
    }

    for(let i = this.monitored.length-1; i>=0; i--){
      let chicken = this.monitored[i]
      this.moveMonitored(chicken)
    }
  }

  draw(){return}

  moveMonitored(chicken){

    chicken.location.x = chicken.baseLocation.x + this.patern.x(...this.paternTweak.x ,this.time- chicken.timeCreated)
    chicken.location.y = chicken.baseLocation.y + this.patern.y(...this.paternTweak.y ,this.time- chicken.timeCreated)
    if(this.time-chicken.timeCreated>this.chickenLifespan){
      this.delete(chicken)
    }
  }

  onCollision(collider, data){
    return
  }

  delete(chicken){
    Engine.engine.delete(chicken)
    let index = this.monitored.indexOf(chicken)
    if(index<0){return}
    this.monitored.splice(index, 1)
  }
}