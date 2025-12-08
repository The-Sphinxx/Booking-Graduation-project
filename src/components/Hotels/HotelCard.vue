<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100">
    <figure class="relative h-64">
      <img :src="hotel.mainImage" :alt="hotel.name" class="w-full h-full object-cover" />
      <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1">
        <span class="text-yellow-500">★</span>
        <span>{{ hotel.rating }}</span>
        <span class="text-gray-400 font-normal">({{ hotel.reviews }})</span>
      </div>
    </figure>
    
    <div class="card-body p-6">
      <div class="flex opacity-50 mb-1">
        <span v-for="i in 5" :key="i" class="text-yellow-400 text-sm">★</span>
      </div>
      
      <h2 class="card-title text-xl font-bold text-gray-800">{{ hotel.name }}</h2>
      
      <div class="flex items-center gap-2 text-gray-500 mt-1 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="text-sm">{{ hotel.city }}</span>
      </div>

      <div class="divider my-2"></div>
      
      <div class="flex justify-between items-end mt-2">
        <div>
          <p class="text-gray-400 text-xs uppercase mb-1">From</p>
          <p class="text-2xl font-bold text-primary">${{ hotel.price }} <span class="text-base font-normal text-gray-500">/night</span></p>
        </div>
        <button class="btn btn-primary px-8 text-white hover:btn-primary-focus" @click="$emit('view-details', hotel.id)">
          View Details
        </button>
      </div>
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

defineEmits(['view-details']);
</script>
