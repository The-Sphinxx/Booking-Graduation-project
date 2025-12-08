<template>
  <div class="relative rounded-2xl overflow-hidden h-[400px] group">
    <img 
      :src="images[currentIndex]" 
      alt="Hotel Gallery" 
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    
    <!-- Navigation Arrows -->
    <div class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        @click.stop="prev" 
        class="btn btn-circle btn-sm bg-white/80 hover:bg-white border-none text-gray-800"
      >
        ❮
      </button>
      <button 
        @click.stop="next" 
        class="btn btn-circle btn-sm bg-white/80 hover:bg-white border-none text-gray-800"
      >
        ❯
      </button>
    </div>

    <!-- Dots -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
      <button 
        v-for="(img, idx) in images" 
        :key="idx"
        @click.stop="currentIndex = idx"
        :class="['w-2 h-2 rounded-full transition-all', currentIndex === idx ? 'bg-white w-4' : 'bg-white/50']"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
});

const currentIndex = ref(0);

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
}
</script>
