<script>

import { Engine } from "../../Engine.js"
import { Shop } from "../../Shop.js"
import { PersistantData } from "../../PersistantData.js"
export default {
  data(){
    return {
      money : 0,
      upgradeList : [
        {name : "test", description : "Ne fais rien à part utiliser de la thune", internalName : "test"},
        {name : "test2", description : "Passe le joueur en bleu. C'est tout.", internalName : "test2"},
      ],

      succes : true
    }
  },
  methods:{
    quitShop(){
      Engine.engine.quitShop()
    },

    buy(name, index){
      this.succes = Shop.getInstance().buy(name)
      this.upgradeList[index].cost = this.calculateCost(name)
      this.money = PersistantData.getInstance().totalScore
    },

    calculateCost(name){
      return Shop.getInstance().upgrade[name].cost
    }
  },
  mounted(){
    for(let i = 0; i<this.upgradeList.length;i++){
      this.upgradeList
      this.upgradeList[i].cost = this.calculateCost(this.upgradeList[i].internalName)
    }

    this.money = PersistantData.getInstance().totalScore
  }
}
</script>

<template>
  <div>
    <div>Total Score = {{money}}</div>
    <div v-for="(upgrade, index) in upgradeList" :key="index">
      {{ upgrade.name}} : {{upgrade.description}} 
      <button v-if="upgrade.cost!=-1" class="buy" @click="buy(upgrade.internalName, index)">buy (cost : {{upgrade.cost}})</button>
      <button v-else class="buy">Maxed</button>
    </div>
    <button id="quit" style="position: absolute; top: 0%; right: 0%" @click="quitShop()">X</button>
  </div>

  <div v-if="(!succes)" style="position:absolute; top:50%;left:50%; transform:translate(-50%, -50%)">
    Pas assez d'argent.<button @click="succes=true">X</button>
  </div>
</template>

<style>

</style>