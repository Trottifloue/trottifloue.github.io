import { Engine } from "./Engine.js"
import  { createApp }  from "vue"
import test from "./components/_test.vue"

export class Hud {
  constructor(){
    Hud.instance = this
    this.app = createApp(test)
    this.hud = this.app.mount("#hud")

    console.log(this.hud.player)

  }

  static deleteInstance(){
    Hud.instance = null
  }

  static getInstance(){
    return Hud.instance
  }
}