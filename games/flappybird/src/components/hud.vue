<script>
import AmmoBar from './gameHud/ammoBar.vue'
import Shop from './pause/shop.vue'
import { Engine } from "../Engine.js"

export default {
  components: { AmmoBar, Shop },
  data() {
    return {
      player : {
        ammo : Engine.engine?.player?.ammo !=undefined ? Engine.engine.player.ammo : 0,
        maxAmmo : Engine.engine?.player?.maxAmmo !=undefined ? Engine.engine.player.maxAmmo : 0
      },
      engine : {
        isPaused : false,
        isRunning : false,
        isGameOver : false,
        score : 0,
        isShopOpen : false
      },
      persistantData : {
        score : 0
      },

      texts : {
        play : "Play",
        gameOver : 
        `Game Over 
        Retry ?`
      }
    }
  },
  methods: {
    createEngine : function(){
      Engine.start()
    },
    resume : function () {
      Engine.engine.resume()
    },

    openShop : function(){
      console.log(Engine)
      Engine.engine.openShop()
    }
  }
}
</script>

<template>
  <div v-if="(!engine.isPaused && engine.isRunning) && !engine.isShopOpen" id="gameHudDiv" class="superposedDiv">
    <ammo-bar :ammo="player.ammo" :maxAmmo="player.maxAmmo"></ammo-bar>
    <div id="score">Score : {{engine.score}}</div>
  </div>
  <div v-if="(engine.isPaused && engine.isRunning) && !engine.isShopOpen" id="pauseHudDiv" class="superposedDiv">
    <button class="centeredButton" id="resume" @click="resume()">Resume</button>
  </div>
  <div style="height: 20%; width : 50%" class="centered" v-if="(!engine.isRunning || engine.isGameOver) && !engine.isShopOpen">
    <button id="start" class="xcentered" style="top: 0%;" @click="createEngine()">{{!engine.isGameOver? "Play" : texts.gameOver}}</button>
    <button id="shop" class="xcentered" style="bottom: 0%;" @click="openShop()">Shop</button>
  </div>
  <shop v-if=(engine.isShopOpen)></shop>
</template>

<style>

  .superposedDiv{
      width: 900px;
      height: 900px;
      position: absolute;
      pointer-events: none;
  }

  .centeredButton{
      position:absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;

      text-align: center;
      font-size: 48px;
  }
  #score{
    position:absolute;
    left: 50%;
    top:10px;
    transform: translateX(-50%)
  }

  button{
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 4px;
    padding-bottom: 4px;
    pointer-events: all;
    white-space: pre-line;
    font-size: 35px;
  }

  .centered{
    position:absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
  }
  .xcentered{
    position:absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
