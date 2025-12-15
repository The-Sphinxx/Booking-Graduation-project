<!-- CarDetails.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const car = ref(null)
const allCars = ref([])       
const loading = ref(true)
const error = ref(null)
const selectedImage = ref('')
const selectedAddOns = ref({})

// Load car data from db.json
const loadCarData = async () => {
  try {
    loading.value = true
    const response = await fetch('/db.json')
    if (!response.ok) throw new Error('Failed to load data')
    const data = await response.json()

    allCars.value = data.cars || []

    const carId = parseInt(route.params.id) || 1
    const foundCar = allCars.value.find(c => c.id === carId)
    
    if (foundCar) {
      car.value = foundCar
      selectedImage.value = getImage(car.value.images)
    } else {
      error.value = 'Car not found'
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const getImage = (images) => images?.[0] || '/images-car/placeholder.jpg'
const handleImageError = (event) => {
  event.target.src = '/images-car/placeholder.jpg'
}

const selectImage = (image) => {
  selectedImage.value = image
}

const allImages = computed(() => car.value?.images || [])

const totalPrice = computed(() => {
  if (!car.value) return 0
  let total = car.value.price
  Object.values(selectedAddOns.value).forEach(price => {
    total += price
  })
  return total
})

const toggleAddOn = (name, price) => {
  if (selectedAddOns.value[name]) {
    delete selectedAddOns.value[name]
  } else {
    selectedAddOns.value[name] = price
  }
}

const getRandomCars = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const suggestedCars = computed(() => {
  if (!allCars.value || !car.value) return []
  const otherCars = allCars.value.filter(c => c.id !== car.value.id)
  return getRandomCars(otherCars, 5)
})

onMounted(async () => {
  await loadCarData()
})
</script>

<template>
<div class="font-cairo min-h-screen bg-base-100 page-container">
  <!-- Loading State -->
  <div v-if="loading" class="flex flex-col items-center justify-center min-h-screen gap-4">
    <span class="loading loading-spinner loading-lg text-primary"></span>
    <p class="text-base-content text-lg">Loading car details...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="flex items-center justify-center min-h-screen">
    <p class="text-error text-2xl font-bold">{{ error }}</p>
  </div>

  <!-- Car Details -->
  <div v-else-if="car" class="pb-12">
    <!-- Main Image Section -->
    <div class="relative w-full rounded-xl overflow-hidden shadow-lg glass my-6">
      <div class="w-full h-[600px]">
        <img 
          :src="selectedImage" 
          :alt="car.name"
          class="object-cover w-full h-full"
          @error="handleImageError"
        />
      </div>

      <!-- Navigation Arrows -->
      <div class="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
        <button 
          @click="selectImage(allImages[(allImages.indexOf(selectedImage) - 1 + allImages.length) % allImages.length])" 
          class="btn btn-circle btn-sm bg-base-100/90 hover:bg-base-200 border-0 text-base-content">❮</button>
        <button 
          @click="selectImage(allImages[(allImages.indexOf(selectedImage) + 1) % allImages.length])" 
          class="btn btn-circle btn-sm bg-base-100/90 hover:bg-base-200 border-0 text-base-content">❯</button>
      </div>

      <!-- Carousel Indicators -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <button 
          v-for="(image, index) in allImages" 
          :key="index"
          @click="selectImage(image)"
          class="w-2 h-2 rounded-full transition-all"
          :class="selectedImage === image ? 'bg-primary w-8' : 'bg-primary/50'"></button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
      <!-- Left Column - Car Details -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card bg-base-100 shadow-lg rounded-xl glass">
          <div class="card-body p-6">
            <div class="flex items-center gap-2 mb-2">
              <div class="rating rating-sm">
                <input type="radio" class="mask mask-star-2 bg-accent" />
                <input type="radio" class="mask mask-star-2 bg-accent" />
                <input type="radio" class="mask mask-star-2 bg-accent" />
                <input type="radio" class="mask mask-star-2 bg-accent" />
                <input type="radio" class="mask mask-star-2 bg-accent" checked />
              </div>
              <span class="badge bg-accent text-accent-content border-0 font-semibold px-3">4.8/5</span>
            </div>
            <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-1">{{ car.name }}</h1>
            <div class="flex items-center gap-2 text-sm text-base-content/60 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Cairo, Egypt</span>
            </div>

            <div class="divider my-4"></div>

            <div class="mb-4">
              <h2 class="text-2xl font-bold text-primary mb-1">Luxury SUV</h2>
              <p class="text-base-content/60">MSRP/30/25</p>
              <div class="flex items-baseline gap-2 mt-3">
                <span class="text-4xl font-bold text-accent">${{ car.price }}</span>
                <span class="text-base-content/60">per day</span>
              </div>
            </div>

            <p class="text-base-content text-base leading-relaxed mb-4">{{ car.description }}</p>

            <!-- Specifications Grid -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="flex items-center gap-3 p-4 bg-base-200 rounded-lg border border-base-300">
                <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-base-content/60 mb-0.5">Passenger</p>
                  <p class="font-semibold text-base-content">{{ car.seats }} Passengers</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-4 bg-base-200 rounded-lg border border-base-300">
                <div class="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-base-content/60 mb-0.5">Transmission</p>
                  <p class="font-semibold text-base-content">{{ car.transmission }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Booking Card -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-lg rounded-xl sticky top-4 glass">
          <div class="card-body p-6">
            <h3 class="text-xl font-bold text-primary mb-4">Add-Ons & Extras</h3>
            <div class="space-y-2">
              <div v-for="(price, name) in { '2+ Seats': 100, 'Child Seat': 50, 'Full Insurance': 50, 'Mobile WIFI': 20, 'Oil control': 10, 'Air control': 10 }" :key="name" class="form-control">
                <label class="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer border border-base-300">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" class="checkbox checkbox-sm border-2 border-base-content [--chkbg:theme(colors.primary)] [--chkfg:white]" @change="toggleAddOn(name, price)" :checked="selectedAddOns[name]" />
                    <span class="text-sm font-medium text-base-content">{{ name }}</span>
                  </div>
                  <span class="text-sm font-bold text-accent">+${{ price }}/day</span>
                </label>
              </div>
            </div>

            <div class="divider my-4"></div>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm text-base-content/60">
                <span>Rental price</span>
                <span class="font-semibold text-base-content">${{ car.price }}/day</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-lg font-bold text-base-content">Total per day</span>
                <span class="text-2xl font-bold text-accent">${{ totalPrice }}</span>
              </div>
            </div>

            <button class="btn btn-block bg-primary hover:bg-primary-focus text-primary-content border-0 rounded-md font-semibold text-base py-3 shadow-md hover:shadow-lg transition-all duration-300">
              Continue to booking
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Suggested Cars -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-primary mb-6 text-center">You May also Like</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div 
          v-for="(suggestedCar, index) in suggestedCars" 
          :key="index"
          class="cursor-pointer overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-base-100 glass"
        >
          <div class="relative aspect-video">
            <img 
              :src="getImage(suggestedCar.images)" 
              :alt="suggestedCar.name"
              class="w-full h-full object-cover rounded-xl"
              @error="handleImageError"
            />
          </div>
          <div class="p-3">
            <p class="font-bold text-sm text-base-content truncate mb-1">{{ suggestedCar.name }}</p>
            <p class="text-xs text-base-content/60 mb-2">{{ suggestedCar.description.slice(0, 30) }}...</p>
            <div class="flex items-center gap-2 mb-3">
              <div class="rating rating-xs">
                <input type="radio" class="mask mask-star-2 bg-accent" disabled checked />
              </div>
              <span class="text-xs text-base-content font-semibold">{{ suggestedCar.rating || 4.5 }}</span>
              <span class="text-xs text-base-content/60">(440)</span>
            </div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-lg font-bold text-accent">${{ suggestedCar.price }}</span>
            </div>
            <button class="btn btn-block bg-primary hover:bg-primary-focus text-primary-content border-0 rounded-md btn-sm font-semibold">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.rating input:disabled {
  cursor: default;
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}
</style>
