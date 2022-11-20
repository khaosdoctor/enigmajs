<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Keyboard from './components/Keyboard.vue'
import Lampboard from './components/Lampboard.vue'
import Plugboard from './components/Plugboard.vue'
import Rotors from './components/Rotors.vue'
import Output from './components/Output.vue'
import { reactive } from '@vue/reactivity'

const state = reactive({
  rotors: {
    left: 0,
    middle: 0,
    right: 0,
  },
  ringSettings: {
    left: 0,
    middle: 0,
    right: 0,
  },
  reflector: 0,
  plugboard: {},
  input: '',
  output: '',
})

</script>

<template>
  <header class="column is-full has-text-centered mt-2 mb-5">
    <div class="logo">
      <img src="/enigma-mtl.png" alt="">
    </div>
  </header>

  <section class="columns mb-5">
    <section class="rotors column is-half has-text-centered">
      <Rotors />
    </section>
    <section class="plugboard column is-half has-text-centered">
      <Plugboard />
    </section>
  </section>

  <section class="lampboard container has-text-centered mb-5">
    <Lampboard />
  </section>

  <section class="keyboard container has-text-centered mb-5">
    <Keyboard />
  </section>

  <section class="output container has-text-centered mb-5">
    <Output />
  </section>
</template>

<style scoped>
</style>
