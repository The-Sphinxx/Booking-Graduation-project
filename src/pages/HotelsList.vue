<template>
  <div class="min-h-screen bg-gray-50 pb-12">
    <!-- Header or Nav would be outside this page usually, but if needed we can add a simple header wrapper here or assume App.vue handles it -->
    
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb / Back Navigation -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Hotels in Cairo</h1>
        <p class="text-gray-500">{{ hotelsStore.hotels.length }} Hotels found</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters -->
        <aside class="col-span-1">
          <HotelFilter @filter-change="handleFilterChange" />
        </aside>

        <!-- Hotels List -->
        <main class="col-span-1 lg:col-span-3">
          <!-- Loading State -->
          <div v-if="hotelsStore.loading" class="flex justify-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
          </div>

          <!-- Empty State -->
          <div v-else-if="hotelsStore.hotels.length === 0" class="text-center py-20 text-gray-500">
            <p>No hotels found matching your criteria.</p>
          </div>

          <!-- Results -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <HotelCard 
                v-for="hotel in hotelsStore.hotels" 
                :key="hotel.id" 
                :hotel="hotel" 
                @view-details="navigateToDetails"
             />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useHotelsStore } from '../stores/hotelsStore';
import HotelFilter from '../components/Hotels/HotelFilter.vue';
import HotelCard from '../components/Hotels/HotelCard.vue';

const router = useRouter();
const hotelsStore = useHotelsStore();

onMounted(() => {
  hotelsStore.fetchHotels();
});

function handleFilterChange(filters) {
  hotelsStore.searchHotels(filters);
}

function navigateToDetails(id) {
  router.push({ name: 'HotelDetails', params: { id } }); 
  // Note: 'HotelDetails' route name must be defined in router by user as per instructions
  // Fallback if they strictly use path: router.push(`/hotels/${id}`);
}
</script>
