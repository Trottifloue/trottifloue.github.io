import { Engine } from "./Engine.js"
import { Block } from "./Block.js"

export class CosBlock extends Block{
  color = "blue"
  constructor(location, vectorDirection){
    super(location, vectorDirection)
    this.origin = {
      x:location.x,
      y:location.y
    }
  }

  update(){

    const variationSpeed = 10
    const amplitude = 30
    let delta = Engine.engine.delta

    let newLocation = {}
    newLocation.x = this.velocity.x*delta + this.location.x
    newLocation.y = this.velocity.y*delta + this.location.y

    //cosDirX
    let actualCosY = Math.cos(Math.abs((this.origin.x - this.location.x)/variationSpeed))
    let newCosY = Math.cos(Math.abs((this.origin.x - newLocation.x)/variationSpeed))
    newLocation.y += (newCosY - actualCosY) * this.direction.x * amplitude
    //cosDirY
    let actualCosX = Math.cos(Math.abs((this.origin.y - this.location.y)/variationSpeed))
    let newCosX = Math.cos(Math.abs((this.origin.y - newLocation.y)/variationSpeed))
    newLocation.x += (newCosX - actualCosX) * this.direction.y *amplitude

    this.location.x = newLocation.x
    this.location.y = newLocation.y
    
    this.tryToDelete()
    
  }
}