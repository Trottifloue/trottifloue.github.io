import { PersistantData } from "./PersistantData.js"
import { Engine } from "./Engine.js"

export class Shop{
  static getInstance(){
    if(Shop.instance === undefined){
      return Shop.instance = new Shop()
    }
    return Shop.instance
  }

  buy(name){
    if(this.upgrade[name].cost<PersistantData.getInstance().totalScore){
      PersistantData.getInstance().totalScore-=this.upgrade[name].cost
      PersistantData.getInstance().upgrade[name]++
      return true
    }
    return false
  }

  upgrade = {
    test : {
      get cost(){
        return 5 + PersistantData.getInstance().upgrade.test*2
      },

    },
    test2 : {
      get cost(){
        if(PersistantData.getInstance().upgrade.test2 >=1){return -1}
        return 15
      },
      setup : function(){
        console.log("test")
        if(PersistantData.getInstance().upgrade.test2>0){
          Engine.engine.player.color = "cyan"
        }
      }
    },
  }
}