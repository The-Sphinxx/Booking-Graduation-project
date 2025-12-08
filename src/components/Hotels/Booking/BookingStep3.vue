<template>
  <div>
    <div class="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-6">
      <h3 class="font-bold text-gray-800 text-lg mb-6">Payment Method</h3>
      
      <!-- Payment Method Selection -->
      <div class="space-y-4 mb-8">
         <label class="flex items-center p-4 border rounded-xl cursor-pointer transition-all"
             :class="formData.method === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'"
         >
             <input type="radio" name="payment" value="card" v-model="formData.method" class="radio radio-primary mr-3" @change="emitUpdate" />
             <span class="font-medium text-gray-700 flex items-center gap-2">
                 <span>💳</span> Credit / Debit Card
             </span>
         </label>

         <label class="flex items-center p-4 border rounded-xl cursor-pointer transition-all"
             :class="formData.method === 'hotel' ? 'border-primary bg-primary/5' : 'border-gray-200'"
         >
             <input type="radio" name="payment" value="hotel" v-model="formData.method" class="radio radio-primary mr-3" @change="emitUpdate" />
             <span class="font-medium text-gray-700 flex items-center gap-2">
                 <span>💵</span> Pay at Hotel
             </span>
         </label>
      </div>

      <!-- Credit Card Form -->
      <div v-if="formData.method === 'card'" class="space-y-4 transition-all">
          <div class="form-control">
             <label class="label"><span class="label-text font-semibold">Card Number</span></label>
             <input type="text" v-model="formData.cardNumber" placeholder="1234 5678 9012 3456" class="input input-bordered w-full" @change="emitUpdate" />
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="form-control">
                <label class="label"><span class="label-text font-semibold">Expiry Date</span></label>
                <input type="text" v-model="formData.expiry" placeholder="MM/YY" class="input input-bordered w-full" @change="emitUpdate" />
             </div>
             <div class="form-control">
                <label class="label"><span class="label-text font-semibold">CVV</span></label>
                <input type="text" v-model="formData.cvv" placeholder="123" class="input input-bordered w-full" @change="emitUpdate" />
             </div>
          </div>
      </div>
    
    </div>

    <div class="flex justify-between gap-4">
        <button class="btn btn-outline w-1/3 border-gray-300 text-gray-500 hover:bg-gray-50" @click="$emit('back')">Back</button>
        <button class="btn btn-primary flex-1 text-white" @click="$emit('complete')">Complete Booking</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
    initialData: Object
});

const emit = defineEmits(['update', 'complete', 'back']);

const formData = reactive({
    method: props.initialData.method || 'card',
    cardNumber: props.initialData.cardNumber || '',
    expiry: props.initialData.expiry || '',
    cvv: props.initialData.cvv || ''
});

function emitUpdate() {
    emit('update', { ...formData });
}
</script>
