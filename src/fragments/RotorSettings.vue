<template>
<section class="rotor-setup is-flex is-flex is-flex-direction-row is-justify-content-space-evenly is-align-items-center">
  <div class="rotor-select">
    <span class="select">
      <select name="rotor" v-model="rotor" @change="selectRotor">
        <option v-for="letter in Rotors">{{letter.toUpperCase()}}</option>
      </select>
    </span>
  </div>
  <span><strong>ring:</strong></span>
  <div class="ring-setting">
    <span class="select">
      <select name="setting" v-model="setting" @change="selectSetting">
        <option v-for="letter in ALLOWED_ALPHABET">{{letter.toUpperCase()}}</option>
      </select>
    </span>
  </div>
</section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Rotors, RotorPositions, Rotor } from '../enigma/Rotor'
import { ALLOWED_ALPHABET } from '../types'

const props = defineProps({
  position: String
})

const emit = defineEmits(['rotor-set', 'setting-set', 'position-set'])
const rotor = ref(props.position === RotorPositions.LEFT ? Rotors.III : props.position === RotorPositions.MIDDLE ? Rotors.II : Rotors.I)
const setting = ref('A')

const selectRotor = () => {
  emit('rotor-set', new Rotor(rotor.value, 0, 0), props.position!)
}

const selectSetting = () => {
  emit('setting-set', props.position, setting.value)
}
</script>
<style scoped></style>
