class Spawner{
    _class
    location
    timeElapsed = 0
    totalTime
    blinkingSpeed = 10

    dimension = {
      x:60,
      y:60
    }

  constructor(_class, location, timer, dimension, ...parameters){
    this.totalTime = timer
    this._class = _class
    this.location = location
    this.parameters = [...parameters]
    this.dimension = dimension

    Engine.engine.noCollision.push(this)
  }

  update(){
    this.timeElapsed+=Engine.engine.delta

    if(this.timeElapsed>this.totalTime){
      new this._class(...this.parameters)
      let index = Engine.engine.noCollision.indexOf(this)
      Engine.engine.noCollision.splice(index, 1)
    }
  }

  draw(){
    let ctx = Engine.engine.ctx

    ctx.fillStyle = `rgba(0,0,0, ${Math.sin(this.timeElapsed*Math.PI* this.blinkingSpeed)})`

    ctx.fillRect(this.location.x, this.location.y, this.dimension.x,this.dimension.y)
  }
}