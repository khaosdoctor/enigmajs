<template>
  <input type="text" class="input keyboard-input" name="keyboardInput" id="" :value="state.keyboardInput" @keydown="handleKeyboardPress">
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { GlobalState } from '../types'
import { isLetter } from '../util'

const state = inject<GlobalState>('state')!
const emit = defineEmits(['keyboard-input'])

  const handleKeyboardPress = (e: Event) => {
  e.preventDefault()
  const key = (e as KeyboardEvent).key.toUpperCase()
  if (!isLetter(key)) return false
  emit('keyboard-input', key)
  return true
}
</script>
<style scoped>
</style>
