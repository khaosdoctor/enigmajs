<template>
  <div class="keyboard-row columns has-text-centered" v-for="row in KEYBOARD_ROWS">
    <span v-for="letter in row" class="column keyboard-key-wrapper mb-5">
      <span :class="`keyboard-letter-${letter} keyboard-key ml-6`">{{letter}}</span>
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
  background: linear-gradient(135deg, #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%);
  color: #d0d0d0;
  font-weight: bold;
  cursor: pointer;
  border: 3px solid #999;
}

.keyboard-key:hover {
  border: 3px solid #bbb;
}

.keyboard-key:active {
  border: 5px solid #bbb;
}
</style>
