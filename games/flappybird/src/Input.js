import { Engine } from "./Engine.js"

export const Input = {
  keyup : function(e){

    Input.inputList[e.code] = 0
  },

  keydown : function(e){

    Input.inputList[e.code] = 1
    if(e.code == "Space" && !(Engine.engine?.isGameRunning == true)){
      Engine.createEngine()
    }
  },

  inputList : {
    
  }
}





document.addEventListener("keyup", Input.keyup)
document.addEventListener("keydown", Input.keydown)