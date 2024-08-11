<script setup>
import { useGridConfig } from '@/config/ViewDataConfigAirport';
import { ref } from 'vue';
const gridConfig = ref(useGridConfig());
</script>

<template>
  <bryntum-grid
      ref="gridRef"
      v-bind="gridConfig"
  />
</template>
