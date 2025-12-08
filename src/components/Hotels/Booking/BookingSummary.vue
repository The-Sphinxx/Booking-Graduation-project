<template>
  <div class="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
    <h3 class="font-bold text-gray-800 text-lg mb-4">Booking Summary</h3>
    
    <div class="space-y-3 mb-6">
       <div class="flex justify-between text-sm text-gray-600">
          <span>Room (${{ roomPrice }} x {{ nights }} nights)</span>
          <span class="font-medium">${{ roomTotal }}</span>
       </div>
       <div class="flex justify-between text-sm text-gray-600">
           <span>Taxes & Fees (14%)</span>
           <span class="font-medium">${{ taxes }}</span>
       </div>
       
       <!-- Addons -->
       <div v-if="addOns.length > 0" class="pt-2 border-t border-dashed border-gray-200 mt-2">
            <div v-for="addon in addOns" :key="addon.name" class="flex justify-between text-sm text-gray-600">
                <span>{{ addon.name }}</span>
                <span class="font-medium">+${{ addon.price * nights }}</span>
            </div>
       </div>
    </div>

    <div class="divider my-2"></div>

    <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-gray-800">Total</span>
        <span class="text-2xl font-bold text-primary">${{ total }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  roomPrice: { type: Number, default: 0 },
  days: { type: Number, default: 1 },
  addOns: { type: Array, default: () => [] }
});

const nights = computed(() => Math.max(1, props.days));
const roomTotal = computed(() => props.roomPrice * nights.value);
const addOnsTotal = computed(() => props.addOns.reduce((sum, item) => sum + (item.price * nights.value), 0));
const subTotal = computed(() => roomTotal.value + addOnsTotal.value);
const taxes = computed(() => (subTotal.value * 0.14).toFixed(2));
const total = computed(() => (subTotal.value + parseFloat(taxes.value)).toFixed(2));

</script>
