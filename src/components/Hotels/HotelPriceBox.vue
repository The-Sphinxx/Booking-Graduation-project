<template>
  <div class="bg-base-100 rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Select Room</h3>
    
    <div v-for="(room, index) in rooms" :key="index" class="mb-4 p-4 border rounded-xl hover:border-primary transition-colors cursor-pointer" :class="{'border-primary bg-primary/5': selectedRoom === index}" @click="selectedRoom = index">
        <div class="flex justify-between items-start mb-2">
            <span class="font-semibold text-gray-700">{{ room.type }}</span>
            <span class="text-xs text-gray-500">{{ room.available }} available</span>
        </div>
        <div class="flex justify-between items-end">
            <span class="text-2xl font-bold text-primary">${{ room.price }}</span>
            <!-- Simple indication if selected -->
             <span v-if="selectedRoom === index" class="badge badge-primary">Selected</span>
        </div>
    </div>

    <!-- Total calculations could go here -->

    <button class="btn btn-primary w-full text-white mt-4" :disabled="selectedRoom === null">
      Book Now
    </button>
    
    <div class="mt-6 space-y-3 pt-6 border-t border-gray-100">
        <div class="flex items-center gap-3 text-sm text-gray-500">
            <span class="p-2 bg-gray-100 rounded-lg">📞</span>
            <span>+20 123 456 7890</span>
        </div>
        <div class="flex items-center gap-3 text-sm text-gray-500">
             <span class="p-2 bg-gray-100 rounded-lg">✉️</span>
            <span>info@almasahotel.eg</span>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  rooms: {
    type: Array,
    required: true,
    default: () => []
  }
});

const selectedRoom = ref(null);
</script>
