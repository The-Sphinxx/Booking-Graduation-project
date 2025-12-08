<template>
  <div class="mb-6">
    <div class="flex justify-between items-start">
      <div>
        <div class="flex items-center gap-1 mb-1">
          <span v-for="i in 5" :key="i" class="text-yellow-400 text-lg">★</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ hotel.name }}</h1>
        <div class="flex items-center gap-2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-lg">{{ hotel.city }}</span>
        </div>
        <div class="flex items-center gap-2 mt-2">
            <div class="badge badge-warning gap-1 bg-yellow-100 border-none text-yellow-800">
               <span class="font-bold">★ {{ hotel.rating }}</span> 
               <span>({{ hotel.reviews }})</span>
            </div>
        </div>
      </div>
      
      <!-- Optional: Share/Favorite buttons could go here -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  hotel: {
    type: Object,
    required: true
  }
});
</script>
