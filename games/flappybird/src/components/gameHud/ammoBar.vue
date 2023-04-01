<script>
export default {
  props : {
    ammo : Number,
    maxAmmo : Number
  }
}
</script>

<template>
  <div>
    <img class="unlocked" v-for="index in ammo" v-bind:key="index" src="../../assets/unlockedAmmo.png">
    <img class="locked" v-for="index in maxAmmo - ammo" v-bind:key="index" src="../../assets/lockedAmmo.png">
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
