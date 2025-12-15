<template>
  <div class="min-h-screen bg-base-200">
    <!-- Hero Section with Search -->
    <div 
      class="relative bg-cover bg-center min-h-[585px]"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})` }"
    >
<!-- Positioned Content -->
<div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 transform -translate-x-0 -translate-y-[75px]">
  <!-- Hero Text -->
  <div class="max-w-4xl mb-4">
    <h1 class="font-cairo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
      Find Your
      <span
        class="relative inline-block
        bg-[linear-gradient(to_bottom,white_56%,transparent_85%)]
        bg-clip-text text-transparent"
      >
        Perfect Ride
      </span>
    </h1>
    <p class="font-cairo text-sm sm:text-base md:text-lg text-gray-200 mt-2 leading-relaxed">
      Discover premium vehicles for every journey.
      Luxury, comfort, and reliability at your fingertips.
    </p>
  </div>

  <!-- Search Bar Component -->
  <div class="w-full max-w-6xl">
    <Search
      type="cars"
      @search="handleSearch"
    />
  </div>
</div>


  
</div>
    <!-- Page Title -->
    <div class="my-6 text-center">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content">
        Featured Vehicles
      </h1>
      <p class="text-sm sm:text-base text-base-content/70 mt-1">
        Explore our handpicked selection of premium cars
      </p>
    </div>

    <!-- Main Content: Filters + Cars Grid -->
    <div class="flex flex-col lg:flex-row gap-6 mt-4">
      <!-- Sidebar Filters -->
      <aside class="w-full lg:w-64 max-h-[900px] overflow-y-auto bg-base-200 p-6 rounded-box shadow-lg flex-shrink-0">
        <h2 class="text-xl font-bold text-base-content mb-4">Filters</h2>

        <!-- Price Range -->
        <div class="mb-6">
          <h3 class="font-semibold text-base-content mb-2">Price Range</h3>
          <div class="flex items-center gap-2 text-sm text-base-content">
            <span>$0</span>
            <input type="range" min="0" max="300" v-model="filters.price" class="flex-1 input input-bordered"/>
            <span>$300</span>
          </div>
          <p class="text-right text-sm text-base-content/70 mt-1">Max: ${{ filters.price }}</p>
        </div>

        <!-- Car Type -->
        <div class="mb-6">
          <h3 class="font-semibold text-base-content mb-2">Car Type</h3>
          <div class="flex flex-col gap-1 text-sm text-base-content">
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Kia" v-model="filters.type" class="checkbox checkbox-primary"/>
              Kia
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Coupe" v-model="filters.type" class="checkbox checkbox-primary"/>
              Coupe
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Toyota" v-model="filters.type" class="checkbox checkbox-primary"/>
              Toyota
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Hatchback" v-model="filters.type" class="checkbox checkbox-primary"/>
              Hatchback
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Van" v-model="filters.type" class="checkbox checkbox-primary"/>
              Van
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Minivan / MPV" v-model="filters.type" class="checkbox checkbox-primary"/>
              Minivan / MPV
            </label>
          </div>
        </div>

        <!-- Brand -->
        <div class="mb-6">
          <h3 class="font-semibold text-base-content mb-2">Brand</h3>
          <div class="flex flex-col gap-1 text-sm text-base-content">
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Mercedes" v-model="filters.brand" class="checkbox checkbox-primary"/>
              Mercedes
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="BMW" v-model="filters.brand" class="checkbox checkbox-primary"/>
              BMW
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Audi" v-model="filters.brand" class="checkbox checkbox-primary"/>
              Audi
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Tesla" v-model="filters.brand" class="checkbox checkbox-primary"/>
              Tesla
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Lexus" v-model="filters.brand" class="checkbox checkbox-primary"/>
              Lexus
            </label>
          </div>
        </div>

        <!-- Seats -->
        <div class="mb-6">
          <h3 class="font-semibold text-base-content mb-2">Seats</h3>
          <div class="flex flex-col gap-1 text-sm text-base-content">
            <label class="flex items-center gap-2">
              <input type="checkbox" value="2-4" v-model="filters.seats" class="checkbox checkbox-primary"/>
              2-4 Seats
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="5-6" v-model="filters.seats" class="checkbox checkbox-primary"/>
              5-6 Seats
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="7+" v-model="filters.seats" class="checkbox checkbox-primary"/>
              7+ Seats
            </label>
          </div>
        </div>

        <!-- Transmission -->
        <div class="mb-6">
          <h3 class="font-semibold text-base-content mb-2">Transmission</h3>
          <div class="flex flex-col gap-1 text-sm text-base-content">
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Automatic" v-model="filters.transmission" class="checkbox checkbox-primary"/>
              Automatic
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" value="Manual" v-model="filters.transmission" class="checkbox checkbox-primary"/>
              Manual
            </label>
          </div>
        </div>

        <button 
          class="btn btn-primary w-full mt-2"
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCarsStore } from "@/stores/carsStore.js";
import Search from "@/components/Common/Search.vue";
import LuxurySUVCardDynamic from "@/components/Cars/CarCard.vue";
import { useRouter } from 'vue-router';
import heroImage from "@/assets/images/CarHeroSection.jpg";

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

</script>
