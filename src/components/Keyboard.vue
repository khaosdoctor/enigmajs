<template>

  <div class="keyboard-row columns has-text-centered" v-for="row in KEYBOARD_ROWS">
    <span v-for="letter in row" class="column keyboard-key-wrapper mb-5">
      <span :class="`keyboard-letter-${letter} keyboard-key`">{{letter}}</span>
    </span>
  </div>

</template>

<script setup lang="ts">
import { KEYBOARD_ROWS } from '../types'
</script>

<style scoped>
.keyboard-key {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(34, 34, 34);
  color: rgb(155, 155, 155);
  font-weight: bold;
}
</style>
