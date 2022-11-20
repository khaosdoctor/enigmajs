<script setup lang="ts">
import { inject } from 'vue'
import { GlobalState } from '../types'

const state = inject<GlobalState>('state')
</script>

<template>
<h1>Keyboard</h1>
<pre>{{ state }}</pre>
</template>

<style>

</style>
