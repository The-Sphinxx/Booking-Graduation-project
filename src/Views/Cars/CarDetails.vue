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
      selectedImage.value = car.value.mainImage
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

const selectImage = (image) => {
  selectedImage.value = image
}

const allImages = computed(() => {
  if (!car.value) return []
  return [car.value.images, ...(car.value.thumbnails || [])]
})

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
<div class="min-h-screen bg-gray-50">
  <!-- Loading State -->
  <div v-if="loading" class="flex flex-col items-center justify-center min-h-screen gap-4">
    <span class="loading loading-spinner loading-lg text-orange-600"></span>
    <p class="text-gray-500 text-lg">Loading car details...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="flex items-center justify-center min-h-screen">
    <p class="text-red-500 text-2xl font-bold">{{ error }}</p>
  </div>

  <!-- Car Details -->
  <div v-else-if="car" class="pb-12">
    <!-- Main Image Section with Carousel -->
    <div class="relative w-full max-w-7xl mx-auto my-6 rounded-2xl overflow-hidden bg-white shadow-lg">
      <div class="w-full h-[650px]">
        <img 
          :src="selectedImage" 
          :alt="car.name"
          class="object-cover w-full h-full"
        />
      </div>

      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none"></div>

      <!-- Navigation Arrows -->
      <div class="absolute left-6 right-6 top-1/2 flex -translate-y-1/2 justify-between">
        <button 
          @click="selectImage(allImages[(allImages.indexOf(selectedImage) - 1 + allImages.length) % allImages.length])" 
          class="btn btn-circle btn-sm bg-white/90 hover:bg-white border-0 text-gray-800">❮</button>
        <button 
          @click="selectImage(allImages[(allImages.indexOf(selectedImage) + 1) % allImages.length])" 
          class="btn btn-circle btn-sm bg-white/90 hover:bg-white border-0 text-gray-800">❯</button>
      </div>

      <!-- Carousel Indicators -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <button 
          v-for="(image, index) in allImages" 
          :key="index"
          @click="selectImage(image)"
          class="w-2 h-2 rounded-full transition-all"
          :class="selectedImage === image ? 'bg-white w-8' : 'bg-white/50'"></button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 lg:px-8 mt-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Car Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Car Title Card -->
          <div class="card bg-white shadow-xl rounded-2xl">
            <div class="card-body p-6">
              <div class="flex items-center gap-2 mb-2">
                <div class="rating rating-sm">
                  <input type="radio" class="mask mask-star-2 bg-amber-500" />
                  <input type="radio" class="mask mask-star-2 bg-amber-500" />
                  <input type="radio" class="mask mask-star-2 bg-amber-500" />
                  <input type="radio" class="mask mask-star-2 bg-amber-500" />
                  <input type="radio" class="mask mask-star-2 bg-amber-500" checked />
                </div>
                <span class="badge bg-orange-600 text-white border-0 font-semibold px-3">4.8/5</span>
              </div>
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{{ car.name }}</h1>
              <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Cairo, Egypt</span>
              </div>

              <div class="divider my-4"></div>

              <!-- Price -->
              <div class="mb-4">
                <h2 class="text-2xl font-bold text-gray-900 mb-1">Luxury SUV</h2>
                <p class="text-sm text-gray-500">MSRP/30/25</p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="rating rating-sm">
                    <input type="radio" class="mask mask-star-2 bg-amber-500" checked />
                    <input type="radio" class="mask mask-star-2 bg-amber-500" checked />
                    <input type="radio" class="mask mask-star-2 bg-amber-500" checked />
                    <input type="radio" class="mask mask-star-2 bg-amber-500" checked />
                    <input type="radio" class="mask mask-star-2 bg-amber-500" checked />
                  </div>
                  <span class="text-sm text-gray-600">440 reviews</span>
                </div>
                <div class="flex items-baseline gap-2 mt-3">
                  <span class="text-4xl font-bold text-orange-600">${{ car.price }}</span>
                  <span class="text-gray-500">per day</span>
                </div>
              </div>

              <p class="text-gray-700 text-base leading-relaxed mb-4">{{ car.description }}</p>

              <div class="divider my-4"></div>

              <!-- Specifications Grid -->
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-0.5">Passenger</p>
                    <p class="font-semibold text-gray-900">{{ car.seats }} Passengers</p>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-0.5">Transmission</p>
                    <p class="font-semibold text-gray-900">{{ car.transmission }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Reviews -->
          <div class="card bg-white shadow-xl rounded-2xl" v-if="car.reviews && car.reviews.length">
            <div class="card-body p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div class="space-y-4">
                <div 
                  v-for="(review, index) in car.reviews" 
                  :key="index"
                  class="pb-4 border-b border-gray-200 last:border-b-0 animate-fade-in"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <div class="flex items-start gap-4">
                    <div class="avatar placeholder">
                      <div class="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <span class="text-xl font-semibold">{{ review.name.charAt(0) }}</span>
                      </div>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <h3 class="font-bold text-gray-900">{{ review.name }}</h3>
                        <span class="text-xs text-gray-500">2 weeks ago</span>
                      </div>
                      <div class="rating rating-sm mb-2">
                        <input 
                          v-for="star in 5" 
                          :key="star"
                          type="radio" 
                          class="mask mask-star-2 bg-amber-500" 
                          :checked="star <= review.rating"
                          disabled
                        />
                      </div>
                      <p class="text-gray-700 text-sm leading-relaxed">{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Booking Card -->
        <div class="lg:col-span-1">
          <div class="card bg-white shadow-xl rounded-2xl sticky top-4">
            <div class="card-body p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Add-Ons & Extras</h3>
              <div class="space-y-2">
                <div v-for="(price, name) in { '2+ Seats': 100, 'Child Seat': 50, 'Full Insurance': 50, 'Mobile WIFI': 20, 'Oil control': 10, 'Air control': 10 }" :key="name" class="form-control">
                  <label class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
                    <div class="flex items-center gap-3">
                      <input type="checkbox" class="checkbox checkbox-sm border-2 border-gray-400 [--chkbg:theme(colors.orange.600)] [--chkfg:white]" @change="toggleAddOn(name, price)" :checked="selectedAddOns[name]" />
                      <span class="text-sm font-medium text-gray-900">{{ name }}</span>
                    </div>
                    <span class="text-sm font-bold text-orange-600">+${{ price }}/day</span>
                  </label>
                </div>
              </div>

              <div class="divider my-4"></div>

              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm text-gray-600">
                  <span>Rental price</span>
                  <span class="font-semibold text-gray-900">${{ car.price }}/day</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-gray-900">Total per day</span>
                  <span class="text-2xl font-bold text-orange-600">${{ totalPrice }}</span>
                </div>
              </div>

              <button class="btn btn-block bg-orange-600 hover:bg-orange-700 text-white border-0 rounded-xl font-semibold text-base py-3 shadow-md hover:shadow-lg transition-all duration-300">
                Continue to booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Suggested Cars -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">You May also Like</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div 
            v-for="(suggestedCar, index) in suggestedCars" 
            :key="index"
            class="cursor-pointer overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white"
          >
            <div class="relative aspect-video bg-gradient-to-br from-amber-900 via-gray-800 to-black">
              <img 
                :src="suggestedCar.mainImage" 
                :alt="suggestedCar.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-3">
              <p class="font-bold text-sm text-gray-900 truncate mb-1">{{ suggestedCar.name }}</p>
              <p class="text-xs text-gray-500 mb-2">{{ suggestedCar.description.slice(0, 30) }}...</p>
              <div class="flex items-center gap-2 mb-3">
                <div class="rating rating-xs">
                  <input type="radio" class="mask mask-star-2 bg-amber-500" disabled checked />
                </div>
                <span class="text-xs text-gray-600 font-semibold">{{ suggestedCar.rating || 4.5 }}</span>
                <span class="text-xs text-gray-500">(440)</span>
              </div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-lg font-bold text-orange-600">${{ suggestedCar.price }}</span>
              </div>
              <button class="btn btn-block bg-orange-600 hover:bg-orange-700 text-white border-0 rounded-xl btn-sm font-semibold">
                Book Now
              </button>
            </div>
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
