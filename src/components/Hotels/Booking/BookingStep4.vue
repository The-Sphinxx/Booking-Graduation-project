<template>
  <div class="flex flex-col items-center justify-center text-center">
    <!-- Success Icon -->
    <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
        <span class="text-4xl text-primary">✓</span>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
    <p class="text-gray-500 mb-8">Your reservation has been successfully completed</p>

    <!-- Confirmation Details Box -->
    <div class="bg-white border boundary-orange-100 rounded-2xl p-8 w-full max-w-lg mb-8 text-left shadow-sm">
      <div class="text-center mb-8 border-b border-gray-100 pb-6">
          <p class="text-gray-500 text-sm mb-1">Booking Number</p>
          <p class="text-2xl font-bold text-primary">{{ booking.confirmationCode || 'BK1764630871629' }}</p>
      </div>

      <div class="grid grid-cols-2 gap-y-6">
          <div>
              <p class="text-gray-400 text-xs mb-1">Hotel</p>
              <p class="font-semibold text-gray-800">{{ hotelName }}</p>
          </div>
          <div>
              <p class="text-gray-400 text-xs mb-1">Room Type</p>
              <p class="font-semibold text-gray-800">{{ booking.roomType || 'Deluxe Suite' }}</p>
          </div>
          <div>
              <p class="text-gray-400 text-xs mb-1">Check-in</p>
              <p class="font-semibold text-gray-800">{{ booking.checkIn }}</p>
          </div>
          <div>
              <p class="text-gray-400 text-xs mb-1">Check-out</p>
              <p class="font-semibold text-gray-800">{{ booking.checkOut }}</p>
          </div>
          <div>
              <p class="text-gray-400 text-xs mb-1">Guests</p>
              <p class="font-semibold text-gray-800">{{ booking.guests }} Adults</p>
          </div>
          <div>
              <p class="text-gray-400 text-xs mb-1">Total amount</p>
              <p class="font-bold text-primary text-lg">${{ total }}</p>
          </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-4 justify-center mb-8">
        <button class="btn btn-outline btn-sm gap-2 text-gray-600 border-gray-300">
             <span>⬇</span> Download PDF
        </button>
        <button class="btn btn-outline btn-sm gap-2 text-gray-600 border-gray-300">
             <span>🖨</span> Print
        </button>
        <button class="btn btn-outline btn-sm gap-2 text-gray-600 border-gray-300">
             <span>🔗</span> Share
        </button>
    </div>

    <div class="flex gap-4 w-full max-w-lg">
        <button class="btn btn-outline w-1/2 border-primary text-primary hover:bg-primary hover:text-white" @click="$router.push('/bookings')">View My Bookings</button>
        <button class="btn btn-primary w-1/2 text-white" @click="$router.push('/hotels')">Book Another Hotel</button>
    </div>
    
    <p class="mt-8 text-sm text-gray-400">A confirmation email has been sent to your registered email address.</p>

  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  booking: {
    type: Object,
    required: true
  },
  hotelName: {
      type: String,
      default: 'Hotel Name'
  },
  total: {
      type: [String, Number],
      default: 0
  }
});
</script>
