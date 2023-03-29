<script>
import { Engine } from "../Engine"
export default {
  data() {
    return {
      greeting: 'Hello World!',
      player : {
        ammo : Engine.engine?.player?.ammo !=undefined ? Engine.engine.player.ammo : 0,
        maxAmmo : Engine.engine?.player?.maxAmmo !=undefined ? Engine.engine.player.maxAmmo : 0
      }
    }
  }
}
</script>

<template>
  <div>
    <img class="unlocked" v-for="index in player.ammo" v-bind:key="index" src="../assets/unlockedAmmo.png">
    <img class="locked" v-for="index in player.maxAmmo - player.ammo" v-bind:key="index" src="../assets/lockedAmmo.png">
  </div>
</template>

<style>
.unlocked {
  color: blue;
  font-weight: bold;
}

.locked{
    color: red;
  font-weight: bold;
}
</style>
