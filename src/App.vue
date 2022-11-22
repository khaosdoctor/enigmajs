<template>
  <header class="column is-full has-text-centered mt-2 mb-5">
    <div class="logo">
      <img src="/enigma-mtl.png" alt="">
    </div>

    <div class="description">
      <p>
        This is a simple Enigma machine simulator. It is not a perfect replica of the original machine, but it is close enough to be useful for learning about it.
      </p>

      <p>
        This replicates the Wermacht I (or the Enigma I) machine, which was used by the German military during World War II. It is a three-rotor machine, with a reflector and a plugboard. The rotors are interchangeable, as well as the reflector (despite it was not that common to do so since it took a long time).
      </p>

      <p>
        I used this <a href="https://www.cryptomuseum.com/crypto/enigma/index.htm" target="_blank">excellent resource</a> to learn about the machine and to build this simulator, the logo is also a courtesy of them (with an addition of a metal gradient border by me). And the code is heavily inspired on the professor <a href="http://github.com/mikepound">Mike Pound's</a> version of the Enigma machine, which you can find <a href="https://github.com/mikepound/enigma" target="_blank">here</a>.
      </p>
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

<script setup lang="ts">
import Keyboard from './components/Keyboard.vue'
import Lampboard from './components/Lampboard.vue'
import Plugboard from './components/Plugboard.vue'
import RotorComponent from './components/Rotors.vue'
import Output from './components/Output.vue'
import { reactive } from '@vue/reactivity'
import { GlobalState } from './types'
import { Rotor, RotorPositions, Rotors } from './enigma/Rotor'
import { Reflector, Reflectors } from './enigma/Reflector'
import { provide } from 'vue'

/**
 * The global state approach is not the best option in the case of any app
 * however, since this is a single machine I could chose from two options:
 * - Use a global state like this and have a single source of truth, therefore
 *   the application itself represents the Enigma machine and the state is declared
 *   in the topmost component (this one)
 * - Use a local state and make the application create a new machine every time
 *   the configuration changes, this would be a better approach if we had multiple
 *   machines and we wanted to keep the state of each one of them like other sims
 *   since this only emulates Enigma I this is not needed
 */
const state = reactive<GlobalState>({
  rotors: {
    [RotorPositions.LEFT]: new Rotor(Rotors.III, 0, 0),
    [RotorPositions.MIDDLE]: new Rotor(Rotors.II, 0, 0),
    [RotorPositions.RIGHT]: new Rotor(Rotors.I, 0, 0)
  },
  // UKW-B was the most common reflector used by the German military during WWII
  // since changing reflectors was a time-consuming process.
  reflector: new Reflector(Reflectors.B),
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

<style scoped>
.plugboard {
  border-left: 1px dashed #ededed;
  border-bottom: 1px dashed #ededed;
}

.rotors, .lampboard, .keyboard {
  border-bottom: 1px dashed #ededed;
}

.rotors, .plugboard {
  border-top: 1px dashed #ededed;
}

header .description {
  max-width: 50%;
  margin: 0 auto;
}

header p {
  margin-top: 5px;
  white-space: pre-wrap;
}
</style>
