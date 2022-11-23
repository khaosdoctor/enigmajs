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
  /* background-color: rgb(34, 34, 34); */
  background: #000000;
  background: -moz-linear-gradient(-45deg, #000000 0%, #0a0a0a 11%, #0a0a0a 21%, #4e4e4e 33%, #383838 37%, #383838 37%, #1b1b1b 43%, #1b1b1b 43%, #000000 100%);
  background: -webkit-linear-gradient(-45deg, #000000 0%,#0a0a0a 11%,#0a0a0a 21%,#4e4e4e 33%,#383838 37%,#383838 37%,#1b1b1b 43%,#1b1b1b 43%,#000000 100%);
  background: linear-gradient(135deg, #000000 0%,#0a0a0a 11%,#0a0a0a 21%,#4e4e4e 33%,#383838 37%,#383838 37%,#1b1b1b 43%,#1b1b1b 43%,#000000 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000',GradientType=1 );
  color: #d0d0d0;
  font-weight: bold;
  cursor: not-allowed;
}

.on {
  color: #333333;
  background: #fceabb;
  background: -moz-linear-gradient(-45deg, #fceabb 0%, #f8b500 40%, #f8b500 41%, #fccd4d 43%, #fbdf93 100%);
  background: -webkit-linear-gradient(-45deg, #fceabb 0%,#f8b500 40%,#f8b500 41%,#fccd4d 43%,#fbdf93 100%);
  background: linear-gradient(135deg, #fceabb 0%,#f8b500 40%,#f8b500 41%,#fccd4d 43%,#fbdf93 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#fbdf93',GradientType=1 );
  border: 2px solid #444;
}
</style>
