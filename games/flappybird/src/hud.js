
import  { createApp }  from "vue"
import hud from "./components/hud.vue"

export class Hud {
  constructor(){
    Hud.instance = this
    this.app = createApp(hud)
    this.hud = this.app.mount("#hud")

  }

  static deleteInstance(){
    Hud.instance = null
  }

  static getInstance(){
    return Hud.instance
  }

  getData(){
    
  }
}