<template>

  <div class="lampboard-row columns has-text-centered" v-for="row in KEYBOARD_ROWS">
    <span v-for="letter in row" class="column lampboard-key-wrapper mb-5">
      <span :class="{[`lampboard-${letter}`]: true, 'lampboard-key': true, 'ml-6': true, on: props.switchOn === letter}">{{letter}}</span>
    </span>
  </div>

</template>

<script setup lang="ts">
import { KEYBOARD_ROWS } from '../types'
const props = defineProps<{switchOn: string}>()
</script>

<style scoped>
.lampboard-key {
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

.on {
  background: rgb(255,245,208);
  background: -moz-radial-gradient(circle, rgba(255,245,208,1) 0%, rgba(255,201,0,1) 100%);
  background: -webkit-radial-gradient(circle, rgba(255,245,208,1) 0%, rgba(255,201,0,1) 100%);
  background: radial-gradient(circle, rgba(255,245,208,1) 0%, rgba(255,201,0,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fff5d0",endColorstr="#ffc900",GradientType=1);
  color: #000;
}
</style>
