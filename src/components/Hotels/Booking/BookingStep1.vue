<template>
  <div>
    <div class="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-6">
      <h3 class="font-bold text-gray-800 text-lg mb-4">Rooms & Date Selection</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
         <div class="form-control">
            <label class="label"><span class="label-text font-semibold">Check-in Date</span></label>
            <input type="date" v-model="formData.checkIn" class="input input-bordered w-full" @change="emitUpdate" />
         </div>
         <div class="form-control">
            <label class="label"><span class="label-text font-semibold">Check-out Date</span></label>
             <input type="date" v-model="formData.checkOut" class="input input-bordered w-full" @change="emitUpdate" />
         </div>
      </div>

      <div class="form-control mb-6">
         <label class="label"><span class="label-text font-semibold">Guests</span></label>
         <input type="number" min="1" v-model="formData.guests" class="input input-bordered w-full" @change="emitUpdate" />
      </div>

      <h4 class="font-semibold text-gray-800 mb-3">Add-ons (Optional)</h4>
      <div class="space-y-3">
         <div 
            v-for="addon in availableAddons" 
            :key="addon.name"
            class="flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all"
            :class="isAddonSelected(addon) ? 'border-primary bg-primary/5' : 'border-gray-200'"
            @click="toggleAddon(addon)"
         >
            <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full border flex items-center justify-center" 
                     :class="isAddonSelected(addon) ? 'border-primary bg-primary text-white' : 'border-gray-300'">
                    <span v-if="isAddonSelected(addon)" class="text-xs">✓</span>
                </div>
                <span class="font-medium text-gray-700">{{ addon.name }}</span>
            </div>
            <span class="text-primary font-bold">${{ addon.price }} <span class="text-gray-400 font-normal text-xs">/night</span></span>
         </div>
      </div>
    </div>

    <div class="flex justify-between gap-4">
        <button class="btn btn-outline w-1/3 border-gray-300 text-gray-500 hover:bg-gray-50" @click="$router.back()">Back to Hotel</button>
        <button class="btn btn-primary flex-1 text-white" @click="$emit('next')">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
    initialData: Object
});

const emit = defineEmits(['update', 'next']);

const availableAddons = [
    { name: 'Breakfast included', price: 120 },
    { name: 'Premium wifi', price: 10 },
    { name: 'Parking space', price: 8 }
];

const formData = reactive({
    checkIn: props.initialData.checkIn || '',
    checkOut: props.initialData.checkOut || '',
    guests: props.initialData.guests || 2,
    addOns: props.initialData.addOns || []
});

function isAddonSelected(addon) {
    return formData.addOns.some(a => a.name === addon.name);
}

function toggleAddon(addon) {
    if (isAddonSelected(addon)) {
        formData.addOns = formData.addOns.filter(a => a.name !== addon.name);
    } else {
        formData.addOns.push(addon);
    }
    emitUpdate();
}

function emitUpdate() {
    emit('update', { ...formData });
}
</script>
