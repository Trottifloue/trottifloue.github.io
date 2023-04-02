import { Engine } from "../Engine.js"
import { Timestamp } from "./Timestamp.js"

import {Level1} from "./Level1.js"

let LevelList = [
  Level1
]

export class Level{
  list

  time = 0

  update(){
    let delta = Engine.engine.delta
    
    this.time+=delta
    while(true){
      if( this.list.length>0 && this.time>this.list[0].time){
        for(let i = 0; i<this.list[0].entities.length;i++){
          new this.list[0].entities[i].class(...this.list[0].entities[i].dataConstructor)
        }
        this.list.splice(0,1)
      }else{
        break
      }
    }
  }

  constructor(number){
    this.list = new LevelList[number]().list
  }
}