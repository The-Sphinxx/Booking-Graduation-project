<template>
  <div class="flex justify-between items-center w-full max-w-4xl mx-auto mb-8 px-4">
    <div v-for="(s, index) in steps" :key="index" class="flex flex-col items-center relative z-10 w-1/4">
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300"
        :class="[
            currentStep > index + 1 ? 'bg-primary border-primary text-white' : 
            currentStep === index + 1 ? 'bg-primary text-white border-primary' : 
            'bg-white text-gray-400 border-gray-300'
        ]"
      >
        <span v-if="currentStep > index + 1">✓</span>
        <span v-else>{{ index + 1 }}</span>
      </div>
      <span class="mt-2 text-xs md:text-sm font-medium text-gray-600" :class="{'text-primary font-bold': currentStep === index + 1}">
          {{ s }}
      </span>
      
      <!-- Connector Line -->
      <div v-if="index < steps.length - 1" class="absolute top-5 left-[50%] w-full h-[2px] -z-10" 
           :class="currentStep > index + 1 ? 'bg-primary' : 'bg-gray-200'">
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true,
    default: 1
  }
});

const steps = ['Rooms & Dates', 'Guest info', 'Payment', 'Confirmation'];
</script>
