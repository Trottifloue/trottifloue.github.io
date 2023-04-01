import { Engine } from "./Engine.js"

export const Input = {
  keyup : function(e){

    Input.inputList[e.code] = 0
  },

  keydown : function(e){
    
    Input.inputList[e.code] = 1
    if(e.code == "Space" && (Engine.engine == undefined || (Engine.engine.isGameOver === true && Engine.engine.isShopOpen === false))){
      Engine.start()
    } else if(e.code == "Escape" && (Engine.engine != undefined)){
      if(Engine.engine.isPaused){
        Engine.engine.resume()
        return
      }
      Engine.engine.pause()
    }
  },

  inputList : {
    
  }
}





document.addEventListener("keyup", Input.keyup)
document.addEventListener("keydown", Input.keydown)