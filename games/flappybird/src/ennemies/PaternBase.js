//Patern = {x:Function, y:Function avec un argument}

import { Engine } from "../Engine.js";
import { HeadlessChicken } from "./HeadlessChicken.js";

export class PaternBase {
  time = 0
  timeSinceLast = 0
  monitored = []

  collisionType = "circle"
  collisionReceiving = []
  collisionGiving = []
  radius = 0

  constructor(number, interval, patern, beginLocation, lifespan){
    this.numberToSpawn = number
    this.interval = interval
    this.location = beginLocation

    this.patern = patern
    this.chickenLifespan = lifespan

    Engine.engine.entities.push(this)
  }

  update(){
    let delta = Engine.engine.delta
    this.time+=delta
    this.timeSinceLast+=delta
    if(this.timeSinceLast>this.interval && this.numberToSpawn>0){
      this.monitored.push(new HeadlessChicken(this.time))
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

    chicken.location.x = this.location.x + this.patern.x(this.time- chicken.timeCreated)
    chicken.location.y = this.location.y + this.patern.y(this.time- chicken.timeCreated)
    if(this.time-chicken.timeCreated>this.chickenLifespan){
      let index = Engine.engine.entities.indexOf(chicken)
      let index2 = this.monitored.indexOf(chicken)
  
      Engine.engine.entities.splice(index, 1)
      this.monitored.splice(index2, 1)
    }
  }

  onCollision(collider, data){
    return
  }
}