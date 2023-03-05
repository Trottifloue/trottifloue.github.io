let Input = {
  keyup : function(e){

    Input.inputList[e.code] = 0
  },

  keydown : function(e){
    
    Input.inputList[e.code] = 1
  },

  inputList : {
    
  }
}





document.addEventListener("keyup", Input.keyup)
document.addEventListener("keydown", Input.keydown)