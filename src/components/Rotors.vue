<template>
<section class="columns">
  <div class="column reflector">
    <h2 class="mb-3"><strong>Reflector (UKW)</strong></h2>
    <span class="select">
      <select name="reflector" v-model="reflector" @change="selectReflector">
        <option>{{Reflectors.A}}</option>
        <option>{{Reflectors.B}}</option>
        <option>{{Reflectors.C}}</option>
      </select>
    </span>
  </div>

  <div class="column rotor rotor-left">
    <h2 class="mb-3">
      <strong>Left Rotor</strong>
    </h2>
    <RotorSettings :allowed-options="allowedOptions[RotorPositions.LEFT]" :position="RotorPositions.LEFT" @rotor-set="setRotor" @setting-set="setRingSetting"/>

    <div class="rotor-position is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly mt-3">
      <span class="previousPosition mb-2">{{toChar(normalizeToAlphabetBounds((state.rotors.LEFT.position)-1))}}</span>
      <span class="select">
        <select name="position" v-model="state.rotors.LEFT.position">
          <option v-for="letter in ALLOWED_ALPHABET" :value="toAlphabetIndex(letter)">{{letter.toUpperCase()}}</option>
        </select>
      </span>
      <span class="nextPosition mt-2">{{toChar(normalizeToAlphabetBounds((state.rotors.LEFT.position)+1))}}</span>
    </div>
  </div>

  <div class="column rotor rotor-middle">
    <h2 class="mb-3">
      <strong>Middle Rotor</strong>
    </h2>

    <RotorSettings :allowed-options="allowedOptions[RotorPositions.MIDDLE]" :position="RotorPositions.MIDDLE" @rotor-set="setRotor" @setting-set="setRingSetting"/>

    <div class="rotor-position is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly mt-3">
      <span class="previousPosition mb-2">{{toChar(normalizeToAlphabetBounds((state.rotors.MIDDLE.position)-1))}}</span>
      <span class="select">
        <select name="position" v-model="state.rotors.MIDDLE.position">
          <option v-for="letter in ALLOWED_ALPHABET" :value="toAlphabetIndex(letter)">{{letter.toUpperCase()}}</option>
        </select>
      </span>
      <span class="nextPosition mt-2">{{toChar(normalizeToAlphabetBounds((state.rotors.MIDDLE.position)+1))}}</span>
    </div>
  </div>

  <div class="column rotor rotor-right">
    <h2 class="mb-3">
      <strong>Right Rotor</strong>
    </h2>


    <RotorSettings :allowed-options="allowedOptions[RotorPositions.RIGHT]" :position="RotorPositions.RIGHT" @rotor-set="setRotor" @setting-set="setRingSetting"/>

    <div class="rotor-position is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly mt-3">
      <span class="previousPosition mb-2">{{toChar(normalizeToAlphabetBounds((state.rotors.RIGHT.position)-1))}}</span>
      <span class="select">
        <select name="position" v-model="state.rotors.RIGHT.position">
          <option v-for="letter in ALLOWED_ALPHABET" :value="toAlphabetIndex(letter)">{{letter.toUpperCase()}}</option>
        </select>
      </span>
      <span class="nextPosition mt-2">{{toChar(normalizeToAlphabetBounds((state.rotors.RIGHT.position)+1))}}</span>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { Reflector, Reflectors } from '../enigma/Reflector'
import { GlobalState } from '../types'
import RotorSettings from '../fragments/RotorSettings.vue'
import { Rotor, RotorPositions, Rotors } from '../enigma/Rotor'
import { toAlphabetIndex, toChar, normalizeToAlphabetBounds } from '../util'
import { ALLOWED_ALPHABET } from '../types'

const calculateAllowedOptions = () => {
  return {
    [RotorPositions.LEFT]: Object.values(Rotors).filter((name) => name !== state.rotors.MIDDLE.name && name !== state.rotors.RIGHT.name),
    [RotorPositions.MIDDLE]: Object.values(Rotors).filter((name) => name !== state.rotors.LEFT.name && name !== state.rotors.RIGHT.name),
    [RotorPositions.RIGHT]: Object.values(Rotors).filter((name) => name !== state.rotors.MIDDLE.name && name !== state.rotors.LEFT.name)
  }
}

const state = inject<GlobalState>('state')!
const reflector = ref(Reflectors.B)
let allowedOptions = calculateAllowedOptions()

const selectReflector = () => {
  state.reflector = new Reflector(reflector.value)
}

const setRotor = (rotor: Rotor, position: RotorPositions) => {
  state.rotors[position] = rotor
  allowedOptions = calculateAllowedOptions()
}

const setRingSetting = (position: RotorPositions, letterAsChar: string) => {
  state.rotors[position].ringSetting = toAlphabetIndex(letterAsChar)
}
</script>

<style>
.nextPosition, .previousPosition {
  color: #b3b3b3;
  font-size: 13px;
}

.rotor-position {
  border-top: 1px solid #ececec;
  padding: 5px 0;
}

.reflector {
  border-right: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
