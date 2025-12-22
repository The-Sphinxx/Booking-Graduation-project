<template>
  <!-- Navbar -->
  <nav class="bg-base-100 shadow-md sticky top-0 z-50">
    <div class="page-container">
      <div class="flex items-center justify-between h-20">
        <router-link to="/" class="text-3xl font-bold text-primary font-cairo">PYRAMIS</router-link>
        
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="font-cairo font-semibold transition-colors duration-200 hover:text-primary/80"
            active-class="text-primary"
            exact-active-class="text-primary"
          >Home</router-link>
          <router-link 
            to="/attractions/list" 
            class="font-cairo text-base-content hover:text-primary transition-colors duration-200"
            active-class="text-primary font-semibold"
          >Attractions</router-link>
          <router-link 
            to="/hotels/list" 
            class="font-cairo text-base-content hover:text-primary transition-colors duration-200"
            active-class="text-primary font-semibold"
          >Hotels</router-link>
          <router-link 
            to="/trips/list" 
            class="font-cairo text-base-content hover:text-primary transition-colors duration-200"
            active-class="text-primary font-semibold"
          >Trips</router-link>
          <router-link 
            to="/cars/list" 
            class="font-cairo text-base-content hover:text-primary transition-colors duration-200"
            active-class="text-primary font-semibold"
          >Car Rental</router-link>
          <router-link 
            to="/ai/collect-data" 
            class="font-cairo text-base-content hover:text-primary transition-colors duration-200"
            active-class="text-primary font-semibold"
          >Ai Trip Planner</router-link>
        </div>

        <div class="hidden md:flex items-center gap-3">
          <router-link to="/authentication/login" class="btn btn-ghost btn-sm font-cairo border border-base-300">
            <i class="fas fa-user mr-2"></i>Login
          </router-link>
          <router-link to="/authentication/sign-up" class="btn btn-primary btn-sm font-cairo">Sign Up</router-link>
          <button class="btn btn-circle btn-sm btn-ghost">
            <i class="fas fa-adjust text-lg"></i>
          </button>
        </div>

        <button class="md:hidden btn btn-ghost btn-circle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform opacity-0 -translate-y-2"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-base-300">
          <div class="flex flex-col space-y-4">
            <router-link 
              to="/" 
              class="font-cairo font-semibold"
              active-class="text-primary"
              exact-active-class="text-primary"
              @click="mobileMenuOpen = false"
            >Home</router-link>
            <router-link 
              to="/attractions/list" 
              class="font-cairo text-base-content"
              active-class="text-primary font-semibold"
              @click="mobileMenuOpen = false"
            >Attractions</router-link>
            <router-link 
              to="/hotels/list" 
              class="font-cairo text-base-content"
              active-class="text-primary font-semibold"
              @click="mobileMenuOpen = false"
            >Hotels</router-link>
            <router-link 
              to="/trips/list" 
              class="font-cairo text-base-content"
              active-class="text-primary font-semibold"
              @click="mobileMenuOpen = false"
            >Trips</router-link>
            <router-link 
              to="/cars/list" 
              class="font-cairo text-base-content"
              active-class="text-primary font-semibold"
              @click="mobileMenuOpen = false"
            >Car Rental</router-link>
            <router-link 
              to="/ai/collect-data" 
              class="font-cairo text-base-content"
              active-class="text-primary font-semibold"
              @click="mobileMenuOpen = false"
            >Ai Trip Planner</router-link>
            
            <div class="flex gap-2 pt-4">
              <router-link to="/authentication/login" class="btn btn-ghost btn-sm font-cairo flex-1" @click="mobileMenuOpen = false">Login</router-link>
              <router-link to="/authentication/sign-up" class="btn btn-primary btn-sm font-cairo flex-1" @click="mobileMenuOpen = false">Sign Up</router-link>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.font-cairo {
  font-family: 'Cairo', sans-serif;
}

/* Active link transitions */
a {
  transition: all 0.3s ease;
}
</style>
