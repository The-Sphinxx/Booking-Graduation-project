<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { initializeTheme } = useTheme();

// Initialize theme on app mount
onMounted(() => {
    initializeTheme();
});
</script>
