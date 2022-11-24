<template>
  <header class="column is-full has-text-centered mt-2 mb-5">
    <div class="logo">
      <img src="/enigma-mtl.png" alt="">
    </div>

    <div class="description">
      <p>
        This replicates the <strong>Wehrmacht I (or the Enigma I)</strong> machine, which was used by the German military during World War II. It is not a perfect replica of the original machine, but it is close enough to be useful for learning about it. It is a three-rotor machine, with a reflector and a plugboard. The rotors are interchangeable, as well as the reflector.
      </p>

      <p>
        I used this <a href="https://www.cryptomuseum.com/crypto/enigma/index.htm" target="_blank">excellent resource</a> to learn about the machine and to build this simulator, the logo is also a courtesy of them (with an addition of a metal gradient border by me). And the code is heavily inspired on the professor <a href="http://github.com/mikepound">Mike Pound's</a> version of the Enigma machine, which you can find <a href="https://github.com/mikepound/enigma" target="_blank">here</a>.
      </p>

      <p>
        You can find the source code of this project <a href="https://github.lsantos.dev/enigmajs" target="_blank">here</a> with all the details and instructions, please leave a star if you liked it 🥰.
      </p>
    </div>

  </header>

  <section class="columns settings mb-5 is-flex is-align-items-center">
    <section class="rotors column is-half has-text-centered">
      <RotorComponent/>
    </section>
    <section class="plugboard column is-half has-text-centered">
      <Plugboard/>
    </section>
  </section>

  <section class="output has-text-centered mb-5">
    <Output />
  </section>

  <section class="lampboard is-flex is-flex-direction-column is-align-items-center is-align-content-space-between is-justify-content-space-around has-text-centered">
    <Lampboard :switch-on="switchedOnLetter"/>
  </section>

  <section class="keyboard is-flex is-flex-direction-column is-align-items-center is-align-content-space-between is-justify-content-space-around has-text-centered mb-5">
    <h1>Input</h1>
    <KeyboardInput @keyboard-input="handleKeyPress"/>
    <Keyboard @key-pressed="handleKeyPress"/>
  </section>

  <section class="steps mb-5">
    <h1 class="has-text-centered"><a @click="showSteps = !showSteps">{{showSteps ? 'Hide' : 'Show'}} encoding steps</a></h1>
    <div v-show="showSteps" class="has-text-centered">
      <div v-show="state.steps.length === 0">No steps to show, please type something in the keyboard</div>
      <ul v-show="state.steps.length>0">
        <li v-for="step in state.steps" :key="step" :class="{separator: step.charAt(0) === '-'}">
          {{ step }}
        </li>
      </ul>
    </div>
  </section>

  <footer>
    <div class="columns">
      <div class="column is-full has-text-centered">
        <p>See the <a href="http://github.lsantos.dev/enigmajs" target="_blank" rel="noopener noreferrer">original repository</a> for license information</p>
        <p>Made with 💛 with JavaScript and Vue.js | Feel free to use this application in any <strong class="is-italic">non-commercial</strong> way</p>
        <p>{{`v${version}`}} Copyright {{new Date().getFullYear()}} © <a target="_blank" href="http://lsantos.dev">Lucas Santos</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Keyboard from './components/Keyboard.vue'
import Lampboard from './components/Lampboard.vue'
import Plugboard from './components/Plugboard.vue'
import RotorComponent from './components/Rotors.vue'
import Output from './components/Output.vue'
import KeyboardInput from './fragments/KeyboardInput.vue'

import { reactive } from '@vue/reactivity'
import { AllowedAlphabet,  GlobalState } from './types'
import { Rotor, RotorPositions, Rotors } from './enigma/Rotor'
import { Reflector, Reflectors } from './enigma/Reflector'
import { provide, ref } from 'vue'
import { toChar } from './util'
import { version } from '../package.json'

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
  output: '',
  keyboardInput: '',
  steps: []
})

// REFS AND VARIABLES

provide('state', state)
const showSteps = ref(false)
// letter that's currently being switched on in the lampboard
const switchedOnLetter = ref('')

// MAIN LOGIC

/**
 * Main logic for enigma
 * This is what makes the machine work and all the quirks are in implemented here
 */
const handleKeyPress = (keyChar: AllowedAlphabet) => {
  const {rotors:{LEFT: leftRotor, MIDDLE: middleRotor, RIGHT: rightRotor}, reflector} = state

  addStep(`-------- ROTATION FOR KEY ${keyChar} --------`)
  addStep(`Rotors before rotation: ${toChar(leftRotor.position)} ${toChar(middleRotor.position)} ${toChar(rightRotor.position)}`)
  addStep(`Input util now: ${state.keyboardInput}`)
  addStep(`Output util now: ${state.output}`)

  // front-end management for the input
  state.keyboardInput += keyChar

  // perform rotor rotation to all appliable rotors
  rotateRotors()

  // perform the first plugboard substitution
  let entryToPlugboard = plugboardEncode(keyChar)

  // main enigma logic forward
  const rightRotorToMiddle = state.rotors.RIGHT.encodeForward(entryToPlugboard)
  addStep(`Right rotor (${toChar(rightRotor.position)}): ${entryToPlugboard} -> ${toChar(rightRotorToMiddle)}`)

  const middleRotorToLeft = middleRotor.encodeForward(rightRotorToMiddle)
  addStep(`Middle rotor (${toChar(middleRotor.position)}): ${toChar(rightRotorToMiddle)} -> ${toChar(middleRotorToLeft)}`)

  const leftRotorToReflector = leftRotor.encodeForward(middleRotorToLeft)
  addStep(`Left rotor (${toChar(leftRotor.position)}): ${toChar(middleRotorToLeft)} -> ${toChar(leftRotorToReflector)}`)

  // REFLECTOR
  const reflectorToLeft = reflector.reflect(leftRotorToReflector)
  addStep(`Reflector: ${toChar(leftRotorToReflector)} -> ${toChar(reflectorToLeft)}`)

  // main enigma logic backward
  const leftRotorToMiddle = leftRotor.encodeReturn(reflectorToLeft)
  addStep(`Left rotor (${toChar(leftRotor.position)}): ${toChar(reflectorToLeft)} -> ${toChar(leftRotorToMiddle)}`)

  const middleRotorToRight = middleRotor.encodeReturn(leftRotorToMiddle)
  addStep(`Middle rotor (${toChar(middleRotor.position)}): ${toChar(leftRotorToMiddle)} -> ${toChar(middleRotorToRight)}`)

  // perform the second plugboard substitution
  const rightRotorToPlugboard = rightRotor.encodeReturn(middleRotorToRight)
  addStep(`Right rotor (${toChar(rightRotor.position)}): ${toChar(middleRotorToRight)} -> ${toChar(rightRotorToPlugboard)}`)

  // final output
  const plugboardToOutput = plugboardEncode(toChar(rightRotorToPlugboard) as AllowedAlphabet)

  // front-end management for the output
  state.output += plugboardToOutput

  // turn on the lamp
  turnOnLampboard(plugboardToOutput)

  addStep(`Lampboard: ${plugboardToOutput}`)
  addStep(`Rotors after rotation: ${toChar(leftRotor.position)} ${toChar(middleRotor.position)} ${toChar(rightRotor.position)}`)
  addStep(`New Input: ${state.keyboardInput}`)
  addStep(`New Output: ${state.output}`)
  addStep(`------- ROTATION FOR KEY ${keyChar} --------`)
}

/**
 * Plugboard substitution logic
 */
const plugboardEncode = (keyChar: AllowedAlphabet) => {
  const {plugboard, steps} = state

  if (plugboard[keyChar] !== '') {
    steps.push(`Plugboard: ${keyChar} -> ${plugboard[keyChar]}`)
    return plugboard[keyChar] as AllowedAlphabet
  } else {
    steps.push(`Plugboard: ${keyChar} -> ${keyChar}`)
    return keyChar
  }
}

const rotateRotors = () => {
  const { rotors: {LEFT: leftRotor, MIDDLE: middleRotor, RIGHT: rightRotor} } = state
  // if the middle rotor is at notch
  // there's a double stepping mechanism
  // that makes the middle rotor turns twice
  // read more: https://www.cryptomuseum.com/crypto/enigma/working.htm#double
  if (middleRotor.isAtNotch()) {
    middleRotor.turn()
    leftRotor.turn()
  } else if (rightRotor.isAtNotch()) {
    middleRotor.turn()
  }

  rightRotor.turn()
}

// throttling the turn off of the lamp to make it look more realistic
let timeoutClock: number | null = null
const turnOnLampboard = (keyChar: AllowedAlphabet) => {
  switchedOnLetter.value = keyChar
  // debounce function to turn off the lamp
  // so they don't overlap
  if (timeoutClock) clearTimeout(timeoutClock)
  timeoutClock = window.setTimeout(() => {
    switchedOnLetter.value = ''
  }, 1000)
}

// UTIL

/**
 * Utility function to add steps to the step list
 */
const addStep = (step: string) => {
  state.steps.push(step)
}
</script>

<style scoped>
.plugboard {
  border-left: 1px dashed #ededed;
}

.settings {
  border-bottom: 1px dashed #ededed;
  border-top: 1px dashed #ededed;
}

.lampboard {
  margin-bottom: 50px;
  border-bottom: 18px solid #ededed;
}

header .description {
  max-width: 50%;
  margin: 0 auto;
}

header p {
  margin-top: 5px;
  white-space: pre-wrap;
}

h1 {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
}

.keyboard-input {
  margin: 25px;
  width: 60%;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
}

li.separator {
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
}

li.separator:first-child {
  margin-top: 10px;
}
</style>
