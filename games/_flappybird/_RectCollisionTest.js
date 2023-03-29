class RectCollisionTest {
  collisionType = "rect"

  color = "blue"
  constructor(location, dimension){
    this.location = {
      x:location.x,
      y:location.y
    },
    this.dimension = {
      x:dimension.x,
      y:dimension.y
    }

  }
  update(){

  }

  draw(){
    let ctx = Engine.engine.ctx

    ctx.fillStyle = this.color

    ctx.fillRect(this.location.x, this.location.y, this.dimension.x, this.dimension.y)
  }
}