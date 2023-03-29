export function updateMath(){
  Math.pythagor = function(a, b){
    //return squared distance
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
  }
}

