<template>
  <nav class="bg-base-100 shadow-md sticky top-0 z-50">
    <div class="page-container">
      <div class="flex items-center justify-between h-20">
        <a href="/" class="text-3xl font-bold text-primary font-cairo">{{ metadata.siteName || 'PYRAMIS' }}</a>
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="/" class="font-cairo font-semibold text-primary hover:text-primary/80">Home</a>
          <a href="/attractions" class="font-cairo text-base-content hover:text-primary">Attractions</a>
          <a href="/hotels" class="font-cairo text-base-content hover:text-primary">Hotels</a>
          <a href="/trips" class="font-cairo text-base-content hover:text-primary">Trips</a>
          <a href="/cars" class="font-cairo text-base-content hover:text-primary">Car Rental</a>
          <a href="/ai-planner" class="font-cairo text-base-content hover:text-primary">Ai Trip Planner</a>
        </div>

        <div class="hidden md:flex items-center gap-3">
          <button class="btn btn-ghost btn-sm font-cairo border border-base-300">
            <i class="fas fa-user mr-2"></i>Login
          </button>
          <button class="btn btn-primary btn-sm font-cairo">Sign Up</button>
          <button @click="toggleTheme" class="btn btn-circle btn-sm btn-ghost" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <i v-if="isDark" class="fas fa-sun text-lg"></i>
            <i v-else class="fas fa-moon text-lg"></i>
          </button>
        </div>

        <button class="md:hidden btn btn-ghost btn-circle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-base-300">
        <div class="flex flex-col space-y-4">
          <a href="/" class="font-cairo font-semibold text-primary">Home</a>
          <a href="/attractions" class="font-cairo text-base-content">Attractions</a>
          <a href="/hotels" class="font-cairo text-base-content">Hotels</a>
          <a href="/trips" class="font-cairo text-base-content">Trips</a>
          <a href="/cars" class="font-cairo text-base-content">Car Rental</a>
          <a href="/ai-planner" class="font-cairo text-base-content">Ai Trip Planner</a>
          <div class="flex gap-2 pt-4">
            <button class="btn btn-ghost btn-sm font-cairo flex-1">Login</button>
            <button class="btn btn-primary btn-sm font-cairo flex-1">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from '@/composables/useTheme';

const mobileMenuOpen = ref(false);
const { isDark, toggleTheme } = useTheme();

const metadata = ref({
  siteName: 'PYRAMIS'
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

.font-cairo { font-family: 'Cairo', sans-serif; }
</style>
