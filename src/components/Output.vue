<template>
  <div class="header is-flex is-flex-direction-row is-align-content-center is-justify-content-center is-align-items-center">
    <h1 class="mb-2">Output</h1>
    <span @click="copy" class="icon copy"><i class="fas fa-copy"></i></span>
    <span @click="clear" class="icon clear"><i class="fas fa-times"></i></span>
  </div>
  <section class="columns output-wrapper has-text-centered is-family-code">
    <div class="column output-text">
      <textarea
        disabled
        :value="splitInBlocks(state.output)">
      </textarea>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import chunk from 'lodash.chunk'
import { GlobalState } from '../types'
const state = inject<GlobalState>('state')!

let outputText = ref('')
const splitInBlocks = (text: string) => {
  outputText.value = chunk(text.toUpperCase().split(''), 5).map((chunk) => chunk.join('')).join(' ')
  return outputText.value
}

const copy = () => {
  if (navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(outputText.value)
  }
  return Promise.reject(new Error('Clipboard API not supported'))
}

const clear = (e: Event) => {
  e.preventDefault()
  state.output = ''
  state.keyboardInput = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.0/css/all.min.css');
.output-text textarea {
  background: rgb(255, 248, 171);
  width: 90vw;
  height: 50px;
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
  color: black;
}
h1 {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
}

.icon {
  color: black;
  padding-bottom: 5px;
}

.copy {
  margin-left: 5px;
  cursor: copy;
}

.clear {
  cursor: pointer;
}
.copy:active {
  color: #999;
}
</style>
