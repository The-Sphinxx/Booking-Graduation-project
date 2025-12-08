<template>
  <div>
    <div class="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-6">
      <h3 class="font-bold text-gray-800 text-lg mb-4">Guest Information</h3>
      
      <div class="form-control mb-4">
         <label class="label"><span class="label-text font-semibold">Full Name *</span></label>
         <input type="text" v-model="formData.fullName" class="input input-bordered w-full" placeholder="Ahmed Ashour" @change="emitUpdate" />
      </div>

      <div class="form-control mb-4">
         <label class="label"><span class="label-text font-semibold">Email Address *</span></label>
         <input type="email" v-model="formData.email" class="input input-bordered w-full" placeholder="ahme@icloud.com" @change="emitUpdate" />
      </div>

      <div class="form-control mb-4">
         <label class="label"><span class="label-text font-semibold">Phone Number *</span></label>
         <input type="tel" v-model="formData.phone" class="input input-bordered w-full" placeholder="+20 123 456 7890" @change="emitUpdate" />
      </div>

      <div class="form-control mb-4">
         <label class="label"><span class="label-text font-semibold">Special Requests (Optional)</span></label>
         <textarea v-model="formData.specialRequests" class="textarea textarea-bordered h-24" placeholder="Any special requests or requirements ..." @change="emitUpdate"></textarea>
      </div>
    
    </div>

    <div class="flex justify-between gap-4">
        <button class="btn btn-outline w-1/3 border-gray-300 text-gray-500 hover:bg-gray-50" @click="$emit('back')">Back</button>
        <button class="btn btn-primary flex-1 text-white" @click="$emit('next')">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
    initialData: Object
});

const emit = defineEmits(['update', 'next', 'back']);

const formData = reactive({
    fullName: props.initialData.fullName || '',
    email: props.initialData.email || '',
    phone: props.initialData.phone || '',
    specialRequests: props.initialData.specialRequests || ''
});

function emitUpdate() {
    emit('update', { ...formData });
}
</script>
