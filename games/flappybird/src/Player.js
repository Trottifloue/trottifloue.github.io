//collision receiving = calque sur lesquels recois
//collision giving = calque sur lesquels donne
// un ennemy peut give "player" et le joueur peut recevoir "player". Aucun événement sera déclenché côté ennemy. Mais côté joueur, si.

import { Engine } from "./Engine.js"

import { Input } from "./Input.js"
import { Shockwave } from "./Shockwave.js"
import { Hud } from "./hud.js"

export class Player{
  drawFct = null
  location = {x:0,y:0}
  velocity = {x:0,y:0}
  maxSpeed = 0
  acceleration = 0
  doMove = null
  jumpSpeed = -400
  friction = 80

  dimension = {
    x: 10,
    y:10
  }

  currentAmmo = 1
  set ammo(number){
    this.currentAmmo = number
    Hud.getInstance().hud.player.ammo = number
  }

  get ammo(){
    return this.currentAmmo
  }
  currentMaxAmmo = 3
  set maxAmmo(number){
    this.currentMaxAmmo = number
    Hud.getInstance().hud.player.maxAmmo = number
  }

  get maxAmmo(){
    return this.currentMaxAmmo
  }

  collisionType = "rect"
  collisionReceiving = ["player"]
  collisionGiving = ["powerUp"]

  isDodgeSpawned = false

  update(){
  let delta = Engine.engine.delta    
  let a = Input.inputList.KeyA? Input.inputList.KeyA : 0
  let d = Input.inputList.KeyD? Input.inputList.KeyD : 0
  let w = Input.inputList.KeyW? Input.inputList.KeyW : 0

    if(w == 1){
      if(!this.isDodgeSpawned && this.ammo>0){
      new Shockwave(Engine.engine.player, 130, 20, 0.8)
      this.isDodgeSpawned = true
      this.ammo--
      Hud.getInstance().hud.player == this.ammo

    }
    }else{
      this.isDodgeSpawned = false
    }
  

  let xMove = d - a


    this.velocity.x += delta*this.acceleration*xMove

    if(xMove ==0){
      this.velocity.x += Math.sign(this.velocity.x)*-this.friction*delta
    }

    this.velocity.x = Math.min(Math.max(this.velocity.x, -this.maxSpeed), this.maxSpeed)
    
    this.location.x += this.velocity.x*delta

    this.velocity.y += Engine.engine.gravity*delta
    if(Input.inputList.Space == 1 && !(this.location.y < 60) ){
      this.velocity.y = this.jumpSpeed
    }
  
    this.location.y += this.velocity.y*delta

    let canvas = Engine.engine.canvas

    if(this.location.x < 0 || this.location.x + this.dimension.x > canvas.width){
      this.velocity.x *=-1
      this.velocity.x += Math.sign(this.velocity.x)*40
    }

    if(this.location.y < 0){
      this.velocity.y = Math.abs(this.velocity.y)
    }else if( this.location.y + this.dimension.y > canvas.height){
      this.velocity.y = this.jumpSpeed
      //this.velocity.y *= -1
    }
  }

  draw(){
    this.drawFct()
  }

  constructor(drawFct, locationX, locationY, maxSpeed, acceleration, doMove){
    this.drawFct = drawFct
    this.location.x = locationX
    this.location.y = locationY
    this.maxSpeed = maxSpeed
    this.acceleration = acceleration
    this.doMove = doMove
  }

  detectCollision(){
    let blocks = Engine.engine.entities

    for(let i = 0; i<blocks.length; i++){
      let block = blocks[i]

      let doCollide = Engine.engine.doCollide(this, block)
      if(doCollide){
        return true
      }
    
    }
    return false
  }

  onCollision(collider, data){//when receiving collision
    Engine.engine.isGameRunning = false
  }
}