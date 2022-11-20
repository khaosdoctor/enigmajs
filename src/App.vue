<script setup lang="ts">
import Keyboard from './components/Keyboard.vue'
import Lampboard from './components/Lampboard.vue'
import Plugboard from './components/Plugboard.vue'
import RotorComponent from './components/Rotors.vue'
import Output from './components/Output.vue'
import { reactive } from '@vue/reactivity'
import { GlobalState } from './types'
import { Rotors } from './enigma/Rotor'
import { Reflectors } from './enigma/Reflector'
import { provide } from 'vue'

const state = reactive<GlobalState>({
  rotors: {
    left: {
      name: Rotors.I,
      position: 0,
      ringSetting: 0
    },
    middle: {
      name: Rotors.II,
      position: 0,
      ringSetting: 0
    },
    right: {
      name: Rotors.III,
      position: 0,
      ringSetting: 0
    },
  },
  reflector: Reflectors.B,
  plugboard: {
    A: '',
    B: '',
    C: '',
    D: '',
    E: '',
    F: '',
    G: '',
    H: '',
    I: '',
    J: '',
    K: '',
    L: '',
    M: '',
    N: '',
    O: '',
    P: '',
    Q: '',
    R: '',
    S: '',
    T: '',
    U: '',
    V: '',
    W: '',
    X: '',
    Y: '',
    Z: ''
  },
  input: '',
  output: ''
})
provide('state', state)
</script>

<template>
  <header class="column is-full has-text-centered mt-2 mb-5">
    <div class="logo">
      <img src="/enigma-mtl.png" alt="">
    </div>
  </header>

  <section class="columns mb-5">
    <section class="rotors column is-half has-text-centered">
      <RotorComponent/>
    </section>
    <section class="plugboard column is-half has-text-centered">
      <Plugboard/>
    </section>
  </section>

  <section class="lampboard container has-text-centered mb-5">
    <Lampboard/>
  </section>

  <section class="keyboard container has-text-centered mb-5">
    <Keyboard/>
  </section>

  <section class="output container has-text-centered mb-5">
    <Output />
  </section>
</template>

<style scoped>
</style>
