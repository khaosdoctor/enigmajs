<template>
<h2 class="mb-3"><strong>Plugboard</strong></h2>
<section id="plugboard" class="columns">
  <div v-for="column in columns" class="column is-2">
    <PlugboardInput v-for="letter in column" @plugboard-set="onInput" :plugboard-position="letter"/>
  </div>
</section>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import {isLetter} from '../util'
import chunk from 'lodash.chunk'
import { AllowedAlphabet, ALLOWED_ALPHABET, GlobalState } from '../types'
import PlugboardInput from '../fragments/PlugboardInput.vue'

const ITEMS_PER_COLUMN = 5
const columns = chunk(ALLOWED_ALPHABET, ITEMS_PER_COLUMN) as AllowedAlphabet[][]
const state = inject<GlobalState>('state') as GlobalState

const onInput = (event: Event, plugboardPosition: AllowedAlphabet) => {
  const target = event.target as HTMLInputElement
  const letterToSwap = target.value.toUpperCase() as AllowedAlphabet
  const hydratedPlugboardPosition = plugboardPosition.toUpperCase() as AllowedAlphabet

  if (!isLetter(letterToSwap) || letterToSwap === hydratedPlugboardPosition) {
    clearPlugBoard(hydratedPlugboardPosition)
    target.value = ''
    return
  }

  setPlugboard(hydratedPlugboardPosition, letterToSwap)
}

const setPlugboard = (plugboardPosition: AllowedAlphabet, letterToSwap: AllowedAlphabet) => {
  const valueInLetterToSwap = state.plugboard[letterToSwap] as AllowedAlphabet
  state.plugboard[plugboardPosition] = letterToSwap
  state.plugboard[letterToSwap] = plugboardPosition
  state.plugboard[valueInLetterToSwap] = ''
}

const clearPlugBoard = (plugboardPosition: AllowedAlphabet) => {
  const swapLetter = state.plugboard[plugboardPosition] as AllowedAlphabet
  state.plugboard[plugboardPosition] = ''
  state.plugboard[swapLetter] = ''
}
</script>


