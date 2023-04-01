import { Player } from "./Player.js"
import { Block } from "./Block.js"
import { Ammo } from "./Ammo.js"
import {Hud} from "./hud.js"
import { PersistantData } from "./PersistantData.js"
import { Shop } from "./Shop.js"

export class Engine{

  canvas
  ctx
  gameOver = false
  get isGameOver (){return this.gameOver}
  set isGameOver(value){
    this.gameOver = value
    Hud.getInstance().hud.engine.isGameOver = value
  }
  
  paused = false
  get isPaused(){return this.paused}
  set isPaused(value){
    this.paused = value
    Hud.getInstance().hud.engine.isPaused = value
  }

  run = false
  get isRunning (){return this.run}
  set isRunning(value){
    this.run = value
    Hud.getInstance().hud.engine.isRunning = value
  }

  shopOpen = false
  get isShopOpen(){return this.shopOpen}
  set isShopOpen(value){

    this.shopOpen = value
    Hud.getInstance().hud.engine.isShopOpen = value
  }
  

  
  entities = []
  player
  currentScore = 0
  get score(){return this.currentScore}
  set score(value){
    this.currentScore = value
    Hud.getInstance().hud.engine.score = value
  }

  oldTime = 0
  newTime = 0
  delta

  gravity = 400

  gameLoop(actualTime){
    requestAnimationFrame(Engine.engine.gameLoop)

    Engine.engine.oldTime = Engine.engine.newTime
    Engine.engine.newTime  = actualTime

    Engine.engine.delta = (Engine.engine.newTime - Engine.engine.oldTime)/1000 
    if(Engine.engine.isPaused || Engine.engine.isGameOver || ! Engine.engine.isRunning){return}
    Engine.engine.tick()
    Engine.engine.draw()
  }
  draw(){
  
    Engine.engine.ctx.clearRect(0,0,canvas.width, canvas.height)
    
    for(let i = 0; i<Engine.engine.entities.length; i++){
      Engine.engine.entities[i].draw()
    }
    
    Engine.engine.player.draw()

  
  }
  
  tick(){
    Engine.engine.player.update()

    for(let i = Engine.engine.entities.length-1; i>=0; i--){
      Engine.engine.entities[i].update()
    }

    Block.spawn(Engine.engine.delta)

    Engine.engine.handleCollision()

    Ammo.waitedTime+=Engine.engine.delta

    if(Ammo.timeToWait<Ammo.waitedTime){
      Ammo.waitedTime = 0
      let canvas = Engine.engine.canvas
      let location = {
        x : Math.random()*canvas.width,
        y : Math.random()*canvas.height
      }
      new Ammo(location)
    }
    
  }
  
  play(){

    Engine.engine.entities = []

    Engine.engine.oldTime = performance.now()
    Engine.engine.newTime = Engine.engine.oldTime
    Engine.engine.isGameOver = false

    Engine.engine.score = 0

    let drawPlayer = function(){
      Engine.engine.ctx.fillStyle = this.color
      Engine.engine.ctx.fillRect(this.location.x, this.location.y, this.dimension.x, this.dimension.y)
    }
    
    Engine.engine.player = new Player(drawPlayer, 150,150, 800, 1800, true)
    let upgrades = Shop.getInstance().upgrade
    console.log(upgrades)
    let keys = Object.keys(upgrades)
    for(let i = 0; i<keys.length;i++){
      let upgrade = upgrades[keys[i]]

      if(upgrade.setup){upgrade.setup()}
    }
    Engine.engine.isRunning = true
  }

  pause(){
    if(Engine.engine.isGameOver == true){return}
    Engine.engine.isPaused = true
    Engine.engine.oldTime = performance.now()
    Engine.engine.newTime = Engine.engine.oldTime
  }

  resume(){
    Engine.engine.oldTime = performance.now()
    Engine.engine.newTime = Engine.engine.oldTime
    Engine.engine.isPaused = false
  }

  makeGameOver(){
    Engine.engine.isGameOver = true
    PersistantData.getInstance().totalScore += Engine.engine.score

  }

  openShop(){
    Engine.engine.isShopOpen = true
  }

  quitShop(){
    Engine.engine.isShopOpen = false
  }

  doSquareCollide(a, b){

    let isAllignedYAxis = (a.location.y + a.dimension.y>b.location.y) && (b.location.y+b.dimension.y>a.location.y)
    let isAllignedXAxis = (a.location.x + a.dimension.x>b.location.x) && (b.location.x+b.dimension.x>a.location.x)
    if(isAllignedXAxis && isAllignedYAxis){
      return true
    }
    return false  
  }

  doCircleCollide(a, b){

    let distancePow = Math.pythagor(a.location, b.location)
    let radius = Math.pow(a.radius+b.radius ,2)
    if(distancePow>radius){
      return false
    }
    return true
  }

  doRectAndCircleCollide(square, circle){
    
    if(circle.location.x<square.location.x + square.dimension.x + circle.radius && circle.location.x>square.location.x - circle.radius){//1
      if(circle.location.y<square.location.y + square.dimension.y && circle.location.y> square.location.y){ //2
        return true
      }
    }

    if(circle.location.y<square.location.y + square.dimension.y+circle.radius && circle.location.y>square.location.y-circle.radius){//3
      if(circle.location.x<square.location.x + square.dimension.x && circle.location.x> square.location.x){//4
        return true
      } 
    }

    let corner = [
      {
        x:square.location.x,
        y:square.location.y
      },
      {
        x:square.location.x+square.dimension.x,
        y:square.location.y
      },
      {
        x:square.location.x,
        y:square.location.y+square.dimension.y
      },
      {
        x:square.location.x+square.dimension.x,
        y:square.location.y+square.dimension.y
      }
    ]
    
    for(let i = 0; i<corner.length;i++){
      if(Math.pythagor(circle.location, corner[i])<Math.pow(circle.radius, 2)){
        return true
      }
    }
  }

  doCollide(a,b){

    if(a.collisionType == 'rect'){

      if(b.collisionType == "rect"){
        return Engine.engine.doSquareCollide(a,b)
      }else if(b.collisionType == "circle"){
        //a rect b circle
        return Engine.engine.doRectAndCircleCollide(a,b)
      }

    }else if(a.collisionType == "circle"){
      if(b.collisionType == "rect"){
        //a circle b rect
        return Engine.engine.doRectAndCircleCollide(b,a)
      }else if(b.collisionType == "circle"){
        //a circle b circle
        return Engine.engine.doCircleCollide(a, b)
      }
    }
  }

  static start(){
    Engine.engine.play()
  }

  constructor(){
    Engine.engine = this

    this.oldTime = performance.now()
    this.newTime = this.oldTime
    this.isRunning = false

    Engine.engine.canvas = document.getElementById("canvas")
    Engine.engine.ctx = Engine.engine.canvas.getContext("2d")
    document.addEventListener("blur", (e)=>{Engine.engine.pause()})
    document.addEventListener("focus", (e)=>{console.log("event not used now")})

    this.gameLoop(this.newTime)
  }

  handleCollision(){
    let entities = Engine.engine.entities
    let player = Engine.engine.player


    //entities
    for(let i = entities.length-1; i>=0; i--){
      //Collide
      let act = entities[i]
      let sliced = entities.slice(0, i-entities.length)
      for(let j = sliced.length-1; j>=0; j--){
        let doCollide = null
        let tag = act.collisionGiving.find(element => sliced[j].collisionReceiving.includes(element))
        if(tag!=undefined){
          let doCollide = Engine.engine.doCollide(act, sliced[j])
          if(doCollide){
            sliced[j].onCollision(act, {channel : tag})
          }
        }
        if(doCollide ===false){
          continue
        }
        tag = act.collisionReceiving.find(element => sliced[j].collisionGiving.includes(element))
        if(tag!=undefined){
          if(doCollide===null){
            doCollide = Engine.engine.doCollide(act, sliced[j])
            
          }
          if(doCollide){
            
            act.onCollision(sliced[j], {channel : tag})
          }
        }
      }
    }

        //player
    for(let i =entities.length-1; i>=0; i--){
      let tag = entities[i].collisionGiving.find(element => player.collisionReceiving.includes(element))
      if(tag != undefined){
        if(Engine.engine.doCollide(player, entities[i])){
          player.onCollision(entities[i], {channel : tag})
        }
      }
      for(let i =entities.length-1; i>=0; i--){
        let tag = entities[i].collisionReceiving.find(element => player.collisionGiving.includes(element))
        if(tag != undefined){
          if(Engine.engine.doCollide(player, entities[i])){
            entities[i].onCollision(player, {channel : tag})
          }
        }
      }
    }
  }
}