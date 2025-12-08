<template>
  <div class="min-h-screen bg-gray-50 pb-20 pt-8">
    
    <div v-if="hotelsStore.loading" class="flex justify-center h-screen items-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else class="container mx-auto px-4 max-w-6xl">
        
       <!-- Steps Header -->
       <BookingSteps :currentStep="hotelsStore.currentBooking.step" class="mb-12" />

       <div v-if="hotelsStore.currentBooking.step === 4">
          <!-- Full width confirmation -->
          <BookingStep4 
             :booking="hotelsStore.currentBooking" 
             :hotelName="hotelsStore.selectedHotel?.name"
             :total="calculatedTotal"
          />
       </div>

       <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Form Area -->
          <div class="lg:col-span-2">
             <BookingStep1 v-if="hotelsStore.currentBooking.step === 1" 
                 :initialData="hotelsStore.currentBooking"
                 @update="hotelsStore.updateBookingData($event)"
                 @next="hotelsStore.setBookingStep(2)"
             />
             
             <BookingStep2 v-if="hotelsStore.currentBooking.step === 2" 
                 :initialData="hotelsStore.currentBooking.guestDetails"
                 @update="(data) => hotelsStore.updateBookingData({ guestDetails: data })"
                 @next="hotelsStore.setBookingStep(3)"
                 @back="hotelsStore.setBookingStep(1)"
             />

             <BookingStep3 v-if="hotelsStore.currentBooking.step === 3" 
                 :initialData="hotelsStore.currentBooking.paymentDetails"
                 @update="(data) => hotelsStore.updateBookingData({ paymentDetails: data })"
                 @complete="hotelsStore.confirmBooking()"
                 @back="hotelsStore.setBookingStep(2)"
             />
          </div>

          <!-- Summary Sidebar -->
          <div class="lg:col-span-1">
             <BookingSummary 
                 :roomPrice="hotelsStore.currentBooking.roomPrice || hotelsStore.selectedHotel?.price || 120"
                 :days="calculateDays(hotelsStore.currentBooking.checkIn, hotelsStore.currentBooking.checkOut)"
                 :addOns="hotelsStore.currentBooking.addOns"
             />
          </div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHotelsStore } from '../stores/hotelsStore';
import BookingSteps from '../components/Hotels/Booking/BookingSteps.vue';
import BookingSummary from '../components/Hotels/Booking/BookingSummary.vue';
import BookingStep1 from '../components/Hotels/Booking/BookingStep1.vue';
import BookingStep2 from '../components/Hotels/Booking/BookingStep2.vue';
import BookingStep3 from '../components/Hotels/Booking/BookingStep3.vue';
import BookingStep4 from '../components/Hotels/Booking/BookingStep4.vue';

const route = useRoute();
const hotelsStore = useHotelsStore();

onMounted(async () => {
    hotelsStore.resetBooking();
    const hotelId = route.params.id;
    if (hotelId) {
        await hotelsStore.fetchHotel(hotelId);
        // Set initial room info if basic data loaded
        if (hotelsStore.selectedHotel) {
             hotelsStore.updateBookingData({ 
                 hotelId: hotelsStore.selectedHotel.id,
                 roomPrice: hotelsStore.selectedHotel.price
             });
        }
    }
});

function calculateDays(start, end) {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const timeDiff = Math.abs(e - s);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays > 0 ? diffDays : 1;
}

const calculatedTotal = computed(() => {
    const days = calculateDays(hotelsStore.currentBooking.checkIn, hotelsStore.currentBooking.checkOut);
    const room = (hotelsStore.currentBooking.roomPrice || 0) * days;
    const addons = hotelsStore.currentBooking.addOns.reduce((s, a) => s + (a.price * days), 0);
    const sub = room + addons;
    const tax = sub * 0.14;
    return (sub + tax).toFixed(2);
});
</script>
