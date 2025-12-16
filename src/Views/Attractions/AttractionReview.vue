<template>
  <div class="page-container py-12 font-cairo min-h-screen bg-base-100">
    <div class="max-w-7xl mx-auto">
      <!-- Step Indicator -->
      <div class="mb-8">
        <StepIndicator :current-step="1" :booking-type="bookingType" />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
        <button @click="goBack" class="btn btn-sm">Go Back</button>
      </div>

      <!-- Review Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Side - Booking Details -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-base-100 rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Review Your Booking</h2>
            
            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-map-marker-alt text-primary text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg">{{ bookingStore.bookingInProgress?.itemName }}</h3>
                  <p class="text-base-content/70">Attraction</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-base-200 rounded-lg">
                  <p class="text-sm text-base-content/60 mb-1">Date</p>
                  <p class="font-bold text-lg">{{ formattedDate }}</p>
                </div>
                
                <div class="p-4 bg-base-200 rounded-lg">
                  <p class="text-sm text-base-content/60 mb-1">Guests</p>
                  <p class="font-bold text-lg">{{ bookingStore.bookingInProgress?.bookingData?.guests }} Guests</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-base-100 rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold mb-4">Important Information</h2>
            <ul class="list-disc list-inside space-y-2 text-base-content/80">
              <li>Free cancellation up to 24 hours before your visit.</li>
              <li>Please arrive 15 minutes before your scheduled entry time.</li>
              <li>Valid ID is required for entry.</li>
            </ul>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex gap-4 pt-4">
            <button 
              @click="goBack" 
              class="btn btn-outline flex-1"
            >
              Back
            </button>
            <button 
              @click="handleProceed"
              class="btn btn-primary text-white flex-1 font-bold"
            >
              Proceed to Information
            </button>
          </div>
        </div>

        <!-- Right Side - Price Summary -->
        <div class="lg:col-span-1">
          <PriceSummary
            :costs="bookingStore.bookingCosts"
            :booking-type="bookingType"
            :booking-data="bookingStore.bookingInProgress?.bookingData"
            :base-price="bookingStore.bookingInProgress?.basePrice"
            :add-ons="0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/bookingStore';
import StepIndicator from '@/components/Common/StepIndicator.vue';
import PriceSummary from '@/components/Common/PriceSummary.vue';

const router = useRouter();
const bookingStore = useBookingStore();

const loading = ref(false);
const error = ref(null);

const bookingType = computed(() => {
  return bookingStore.bookingInProgress?.type || 'attraction';
});

const formattedDate = computed(() => {
  const date = bookingStore.bookingInProgress?.bookingData?.date;
  if (!date) return 'Not selected';
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

onMounted(() => {
  // Check if there's a booking in progress
  if (!bookingStore.bookingInProgress) {
    error.value = 'No booking in progress';
    setTimeout(() => {
      router.push({ name: 'Home' });
    }, 2000);
  }
});

const handleProceed = () => {
  router.push({ 
    name: 'AttractionCheckOut', 
    params: { id: bookingStore.bookingInProgress.itemId } 
  });
};

const goBack = () => {
  router.back();
};
</script>
