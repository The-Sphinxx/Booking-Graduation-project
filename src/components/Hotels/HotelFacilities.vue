<template>
  <div class="border rounded-2xl p-6 bg-white border-gray-100 mb-8">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div 
        v-for="(facility, index) in facilities" 
        :key="index"
        class="flex items-center gap-3 text-gray-600"
      >
        <!-- Icon Placeholder or Dynamic Icon Logic -->
        <span class="p-2 bg-primary/10 rounded-lg text-primary">
            <!-- Simple generic checkmark or varying icons based on name -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        </span>
        <span class="font-medium">{{ facility }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  facilities: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>
