<template>
  <div class="field has-addons">
      <span class="control is-flex is-flex-direction-row is-align-content-center">
        <span disabled class="input input-chip has-text-centered">{{props.plugboardPosition}}</span>
        <span class="control">
          <input
            maxlength="1"
            @input="$emit('plugboard-set', $event, props.plugboardPosition)"
            type="text" :value="state.plugboard[props.plugboardPosition]"
            class="input plugboard-input"
          >
        </span>
      </span>
    </div>
</template>

<script setup lang="ts">
import { AllowedAlphabet } from '../types'
import {inject} from 'vue'
import { GlobalState } from '../types'

const state = inject<GlobalState>('state') as GlobalState

const props = defineProps<{
  plugboardPosition: AllowedAlphabet
}>()
</script>

<style scoped>
.input-chip {
  width: 50px;
  border-radius: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
}

.plugboard-input {
  width: 50px;
  border-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
}
</style>
