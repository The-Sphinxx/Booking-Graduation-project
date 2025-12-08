<template>
  <div class="min-h-screen bg-gray-50 pb-20">
     <!-- Loading State -->
    <div v-if="hotelsStore.loading" class="flex justify-center items-center h-screen">
       <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="hotelsStore.selectedHotel" class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <button @click="$router.back()" class="btn btn-ghost btn-sm gap-2 mb-6 text-gray-500 hover:text-primary">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        Back to Hotels
      </button>

      <!-- Header -->
      <HotelDetailsHeader :hotel="hotelsStore.selectedHotel" />

      <!-- Gallery -->
      <div class="mb-8">
         <HotelGallery :images="[hotelsStore.selectedHotel.mainImage, ...hotelsStore.selectedHotel.gallery]" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
            
            <!-- Description -->
            <div class="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 class="text-xl font-bold text-gray-800 mb-4">About this hotel</h3>
                <p class="text-gray-600 leading-relaxed">{{ hotelsStore.selectedHotel.description }}</p>
            </div>

            <!-- Facilities -->
            <HotelFacilities :facilities="hotelsStore.selectedHotel.facilities" />

            <!-- Map -->
            <div class="bg-white p-6 rounded-2xl border border-gray-100">
                 <h3 class="text-xl font-bold text-gray-800 mb-4">Location</h3>
                 <HotelMap :location="hotelsStore.selectedHotel.location" :address="hotelsStore.selectedHotel.city" />
            </div>

            <!-- Reviews Section (Static for now based on JSON, could be expanded) -->
            <div class="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Guest Reviews</h3>
                <!-- Mock reviews matching design style -->
                <div class="space-y-6">
                    <div class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                         <div class="flex justify-between items-center mb-2">
                             <span class="font-bold text-gray-800">Hassan Sabry</span>
                             <div class="flex text-yellow-400 text-xs">★★★★★</div>
                         </div>
                         <p class="text-gray-600 text-sm">Amazing experience! The view was incredible.</p>
                    </div>
                     <div class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                         <div class="flex justify-between items-center mb-2">
                             <span class="font-bold text-gray-800">Abdelrahman Ashraf</span>
                             <div class="flex text-yellow-400 text-xs">★★★★★</div>
                         </div>
                         <p class="text-gray-600 text-sm">Perfect location and excellent service.</p>
                    </div>
                </div>
            </div>

        </div>

        <!-- Sidebar / Booking Box -->
        <div class="lg:col-span-1">
             <HotelPriceBox :rooms="hotelsStore.selectedHotel.rooms" />
        </div>
      </div>

    </div>
    
    <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-700">Hotel not found</h2>
        <button @click="$router.push('/hotels')" class="btn btn-primary mt-4">Browse Hotels</button>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHotelsStore } from '../stores/hotelsStore';
import HotelDetailsHeader from '../components/Hotels/HotelDetailsHeader.vue';
import HotelGallery from '../components/Hotels/HotelGallery.vue';
import HotelFacilities from '../components/Hotels/HotelFacilities.vue';
import HotelPriceBox from '../components/Hotels/HotelPriceBox.vue';
import HotelMap from '../components/Hotels/HotelMap.vue';

const route = useRoute();
const hotelsStore = useHotelsStore();

onMounted(() => {
  const hotelId = route.params.id;
  if (hotelId) {
    hotelsStore.fetchHotel(hotelId);
  }
});
</script>
