<template>
  <div class="w-full h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100 relative">
     <!-- Interactive Map Placeholder -->
     <!-- In a real app, this would be Google Maps or Leaflet -->
     <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
        <div class="text-center">
            <p class="font-bold text-gray-500 text-lg mb-2">Map View</p>
            <p class="text-gray-400">Lat: {{ location.lat }}, Lng: {{ location.lng }}</p>
            <div class="mt-4 p-4 bg-white rounded-lg shadow-lg max-w-xs mx-auto">
                 <span class="text-primary font-bold">📍 {{ address }}</span>
            </div>
        </div>
     </div>
  </div>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    required: true,
    default: () => ({ lat: 0, lng: 0 })
  },
  address: {
      type: String,
      default: ''
  }
});
</script>
