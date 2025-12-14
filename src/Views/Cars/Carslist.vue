<template>
   <div class="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
    <!-- Hero Section -->
    <CarHeroSection @search="handleSearch" />

    

<!-- Main Content: Filters + Cars Grid -->
<div class="flex flex-col lg:flex-row gap-6 mt-4">
  <!-- Sidebar Filters -->
  <aside class="w-full lg:w-64 max-h-[900px] overflow-y-auto bg-white p-6 rounded-2xl shadow-lg flex-shrink-0">
    <h2 class="text-xl font-bold text-black mb-4">Filters</h2>

    <!-- Price Range -->
    <div class="mb-6">
      <h3 class="font-semibold text-black mb-2">Price Range</h3>
      <div class="flex items-center gap-2 text-sm text-black">
        <span>$0</span>
        <input type="range" min="0" max="300" v-model="filters.price" class="flex-1"/>
        <span>$300</span>
      </div>
      <p class="text-right text-sm text-gray-500 mt-1">Max: ${{ filters.price }}</p>
    </div>

    <!-- Car Type -->
    <div class="mb-6">
      <h3 class="font-semibold text-black mb-2">Car Type</h3>
      <div class="flex flex-col gap-1 text-sm text-black">
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Kia" v-model="filters.type" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Kia
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Coupe" v-model="filters.type" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Coupe
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Toyota " v-model="filters.type" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Toyota 
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Hatchback" v-model="filters.type" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Hatchback
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Van" v-model="filters.type" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Van
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Minivan / MPV" v-model="filters.type" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Minivan / MPV
        </label>
      </div>
    </div>

    <!-- Brand -->
    <div class="mb-6">
      <h3 class="font-semibold text-black mb-2">Brand</h3>
      <div class="flex flex-col gap-1 text-sm text-black">
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Mercedes" v-model="filters.brand" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Mercedes
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="BMW" v-model="filters.brand" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          BMW
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Audi" v-model="filters.brand" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Audi
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Tesla" v-model="filters.brand" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Tesla
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Lexus" v-model="filters.brand" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Lexus
        </label>
      </div>
    </div>

    <!-- Seats -->
    <div class="mb-6">
      <h3 class="font-semibold text-black mb-2">Seats</h3>
      <div class="flex flex-col gap-1 text-sm text-black">
        <label class="flex items-center gap-2">
          <input type="checkbox" value="2-4" v-model="filters.seats" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          2-4 Seats
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="5-6" v-model="filters.seats" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          5-6 Seats
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="7+" v-model="filters.seats" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          7+ Seats
        </label>
      </div>
    </div>

    <!-- Transmission -->
    <div class="mb-6">
      <h3 class="font-semibold text-black mb-2">Transmission</h3>
      <div class="flex flex-col gap-1 text-sm text-black">
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Automatic" v-model="filters.transmission" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Automatic
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" value="Manual" v-model="filters.transmission" class="w-4 h-4 rounded-full border-2 border-[#C86A41] checked:bg-[#C86A41] appearance-none"/>
          Manual
        </label>
      </div>
    </div>

    <button 
      class="w-full bg-[#C86A41] hover:bg-[#b65c36] text-white py-2 rounded-xl font-semibold transition-all duration-200"
      @click="resetFilters"
    >
      Reset Filters
    </button>
  </aside>

  <!-- Cars Grid -->
  <main class="flex-1">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <LuxurySUVCardDynamic 
        v-for="car in filteredCars" 
        :key="car.id" 
        :car="car"
        @view="handleViewCar"
      />
    </div>
  </main>
</div>
```

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCarsStore } from "@/stores/carsStore.js";
import CarHeroSection from "@/components/Cars/CarHeroSection.vue"; 
import LuxurySUVCardDynamic from "@/components/Cars/CarCard.vue";
import { useRouter } from 'vue-router';

const store = useCarsStore();
const router = useRouter();

onMounted(async () => {
  await store.fetchCars();
});

const filters = ref({
  price: 300,
  type: [],
  brand: [],
  seats: [],
  transmission: []
});

const filteredCars = computed(() => {
  return store.cars.filter(car => {
    const priceMatch = car.price <= filters.value.price;
    const typeMatch = filters.value.type.length ? filters.value.type.includes(car.category) : true;
    const brandMatch = filters.value.brand.length ? filters.value.brand.some(b => car.name.includes(b)) : true;
    const seatsMatch = filters.value.seats.length ? 
      (filters.value.seats.includes("2-4") && car.seats >=2 && car.seats <=4) ||
      (filters.value.seats.includes("5-6") && car.seats >=5 && car.seats <=6) ||
      (filters.value.seats.includes("7+") && car.seats >=7) : true;
    const transmissionMatch = filters.value.transmission.length ? filters.value.transmission.includes(car.transmission) : true;

    return priceMatch && typeMatch && brandMatch && seatsMatch && transmissionMatch;
  });
});

function resetFilters() {
  filters.value = {
    price: 300,
    type: [],
    brand: [],
    seats: [],
    transmission: []
  };
}

function handleViewCar(car) {
  router.push({ name: 'CarDetails', params: { id: car.id } });
}

function handleSearch(query) {
  console.log("Search query:", query);
}
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
</script>
