<template>
  <div class="min-h-screen bg-base-200 space-y-2">
    <!-- Analytics Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Analytics</h2>
          <router-link 
            to="/dashboard/analytics" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        
        <!-- Charts from Analytics Page -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Monthly Bookings & Revenue Trend -->
          <div class="card bg-base-100 border border-base-300">
            <div class="card-body">
              <h3 class="card-title text-lg">Monthly Bookings & Revenue Trend</h3>
              <div class="h-80 mt-4">
                <Bar :data="mixedChartData" :options="mixedChartOptions" />
              </div>
            </div>
          </div>

          <!-- Booking Status Distribution -->
          <div class="card bg-base-100 border border-base-300">
            <div class="card-body">
              <h3 class="card-title text-lg">Booking Status Distribution</h3>
              <div class="h-80 mt-4 flex items-center justify-center">
                <PolarArea :data="polarAreaChartData" :options="polarAreaChartOptions" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hotels Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Hotels</h2>
          <router-link 
            to="/dashboard/hotels" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        <DataTable
          title=""
          :columns="hotelsColumns"
          :data="hotelsPreview"
          :show-filter="false"
          :show-add-button="false"
          :show-actions="{ edit: false, delete: false, view: true }"
          :per-page="3"
          resource="hotels"
          @view="(row) => $router.push({ name: 'DashboardDetails', params: { type: 'hotels', id: row.id } })"
        />
      </div>
    </div>

    <!-- Cars Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Cars Fleet</h2>
          <router-link 
            to="/dashboard/cars" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        <DataTable
          title=""
          :columns="carsColumns"
          :data="carsPreview"
          :show-filter="false"
          :show-add-button="false"
          :show-actions="{ edit: false, delete: false, view: true }"
          :per-page="3"
          resource="cars"
          @view="(row) => $router.push({ name: 'DashboardDetails', params: { type: 'cars', id: row.id } })"
        />
      </div>
    </div>

    <!-- Attractions Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Attractions</h2>
          <router-link 
            to="/dashboard/attractions" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        <DataTable
          title=""
          :columns="attractionsColumns"
          :data="attractionsPreview"
          :show-filter="false"
          :show-add-button="false"
          :show-actions="{ edit: false, delete: false, view: true }"
          :per-page="3"
          resource="attractions"
          @view="(row) => $router.push({ name: 'DashboardDetails', params: { type: 'attractions', id: row.id } })"
        />
      </div>
    </div>

    <!-- Trips Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Trips</h2>
          <router-link 
            to="/dashboard/trips" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        <DataTable
          title=""
          :columns="tripsColumns"
          :data="tripsPreview"
          :show-filter="false"
          :show-add-button="false"
          :show-actions="{ edit: false, delete: false, view: true }"
          :per-page="3"
          resource="trips"
          @view="(row) => $router.push({ name: 'DashboardDetails', params: { type: 'trips', id: row.id } })"
        />
      </div>
    </div>

    <!-- Bookings Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Bookings</h2>
          <router-link 
            to="/dashboard/bookings" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        <DataTable
          title=""
          :columns="bookingsColumns"
          :data="bookingsPreview"
          :show-filter="false"
          :show-add-button="false"
          :show-actions="{ edit: false, delete: false, view: true }"
          :per-page="3"
          resource="bookings"
          @view="(row) => $router.push({ name: 'DashboardDetails', params: { type: 'bookings', id: row.id } })"
        />
      </div>
    </div>

    <!-- Users Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Users</h2>
          <router-link 
            to="/dashboard/users" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        <DataTable
          title=""
          :columns="usersColumns"
          :data="usersPreview"
          :show-filter="false"
          :show-add-button="false"
          :show-actions="{ edit: false, delete: false, view: true }"
          :per-page="3"
          resource="users"
          @view="(row) => $router.push({ name: 'DashboardDetails', params: { type: 'users', id: row.id } })"
        />
      </div>
    </div>

    <!-- Admins Preview Section -->
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h2 class="card-title text-xl">Admins</h2>
          <router-link 
            to="/dashboard/admins" 
            class="btn btn-sm btn-ghost gap-2"
          >
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
        <DataTable
          title=""
          :columns="adminsColumns"
          :data="adminsPreview"
          :show-filter="false"
          :show-add-button="false"
          :show-actions="{ edit: false, delete: false, view: true }"
          :per-page="3"
          resource="admins"
          @view="(row) => $router.push({ name: 'DashboardDetails', params: { type: 'users', id: row.id } })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import DataTable from '@/components/Dashboard/DataTable.vue';
import { Bar, PolarArea } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
} from 'chart.js';
import { 
  hotelsAPI, 
  carsAPI, 
  attractionsAPI, 
  tripsAPI, 
  bookingsAPI, 
  usersAPI 
} from '@/Services/dashboardApi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const authStore = useAuthStore();
const userName = computed(() => authStore.user?.firstName || 'Admin');

// Data refs
const hotels = ref([]);
const cars = ref([]);
const attractions = ref([]);
const trips = ref([]);
const bookings = ref([]);
const users = ref([]);

// Fetch all data
const fetchAllData = async () => {
  try {
    const [hotelsRes, carsRes, attractionsRes, tripsRes, bookingsRes, usersRes] = 
      await Promise.all([
        hotelsAPI.getAll(),
        carsAPI.getAll(),
        attractionsAPI.getAll(),
        tripsAPI.getAll(),
        bookingsAPI.getAll(),
        usersAPI.getAll()
      ]);

    hotels.value = hotelsRes.data || [];
    cars.value = carsRes.data || [];
    attractions.value = attractionsRes.data || [];
    trips.value = tripsRes.data || [];
    bookings.value = bookingsRes.data || [];
    users.value = usersRes.data || [];
  } catch (error) {
    console.error('Error fetching overview data:', error);
  }
};

// Preview data (top 3 items) - Transform data same as management pages
const hotelsPreview = computed(() => 
  hotels.value.slice(0, 3).map(hotel => ({
    ...hotel,
    images: Array.isArray(hotel.images) ? hotel.images[0] : hotel.images
  }))
);

const carsPreview = computed(() => 
  cars.value.slice(0, 3).map(car => ({
    ...car,
    images: Array.isArray(car.images) ? car.images[0] : car.images,
    location: car.city || 'Cairo',
    price: car.price || car.pricePerDay,
    status: car.status || 'Available'
  }))
);

const attractionsPreview = computed(() => 
  attractions.value.slice(0, 3).map(attraction => ({
    ...attraction,
    images: Array.isArray(attraction.images) ? attraction.images[0] : attraction.images
  }))
);

const tripsPreview = computed(() => 
  trips.value.slice(0, 3).map(trip => ({
    ...trip,
    images: Array.isArray(trip.images) ? trip.images[0] : trip.images
  }))
);

const bookingsPreview = computed(() => bookings.value.slice(0, 3));
const usersPreview = computed(() => users.value.slice(0, 3));
const adminsPreview = computed(() => 
  users.value.filter(u => u.role === 'admin').slice(0, 3)
);

// Column configurations (same as management pages)
const hotelsColumns = [
  { label: 'Property', field: 'images', type: 'image', showNameWithImage: true, headerClass: 'w-1/4' },
  { label: 'Rating', field: 'rating', type: 'rating', headerClass: 'w-1/6' },
  { label: 'City', field: 'city', type: 'text', headerClass: 'w-1/6' },
  { label: 'Price / Night', field: 'price', type: 'price', headerClass: 'w-1/6' },
  { label: 'Actions', type: 'actions', headerClass: 'w-1/6' }
];

const carsColumns = [
  { label: 'Vehicle', field: 'images', type: 'image', showNameWithImage: true, headerClass: 'w-1/4' },
  { label: 'City', field: 'city', type: 'text', headerClass: 'w-1/6' },
  { label: 'Price / Day', field: 'price', type: 'price', headerClass: 'w-1/6' },
  { label: 'Total Fleet', field: 'total_fleet', type: 'text', headerClass: 'w-1/12' },
  { label: 'Actions', type: 'actions', headerClass: 'w-1/6' }
];

const attractionsColumns = [
  { label: 'Attraction', field: 'images', type: 'image', showNameWithImage: true, headerClass: 'w-1/4' },
  { label: 'Price', field: 'price', type: 'text', headerClass: 'w-1/6' },
  { label: 'City', field: 'city', type: 'text', headerClass: 'w-1/6' },
  { label: 'Rating', field: 'rating', type: 'rating', headerClass: 'w-1/6' },
  { label: 'Action', type: 'actions', headerClass: 'w-1/8' }
];

const tripsColumns = [
  { label: 'Trip', field: 'images', type: 'image', showNameWithImage: true, headerClass: 'w-1/4' },
  { label: 'Destination', field: 'city', type: 'text', headerClass: 'w-1/6' },
  { label: 'Duration', field: 'duration', type: 'text', headerClass: 'w-1/6' },
  { label: 'Price', field: 'price', type: 'price', headerClass: 'w-1/6' },
  { label: 'Actions', type: 'actions', headerClass: 'w-1/6' }
];

const bookingsColumns = [
  { label: 'Booking ID', field: 'bookingNumber', type: 'text', headerClass: 'w-1/6' },
  { label: 'Item', field: 'itemName', type: 'text', headerClass: 'w-1/4' },
  { label: 'Type', field: 'type', type: 'text', headerClass: 'w-1/8' },
  { label: 'Date', field: 'bookingDate', type: 'date', headerClass: 'w-1/6' },
  { label: 'Actions', type: 'actions', headerClass: 'w-1/6' }
];

const usersColumns = [
  { label: 'User', field: 'profileImage', type: 'image', showNameWithImage: true, headerClass: 'w-1/4' },
  { label: 'Email', field: 'email', type: 'text', headerClass: 'w-1/4' },
  { label: 'Country', field: 'country', type: 'text', headerClass: 'w-1/6' },
  { label: 'Status', field: 'status', type: 'badge', headerClass: 'w-1/8' },
  { label: 'Actions', type: 'actions', headerClass: 'w-1/6' }
];

const adminsColumns = [
  { label: 'Admin', field: 'profileImage', type: 'image', showNameWithImage: true, headerClass: 'w-1/4' },
  { label: 'Email', field: 'email', type: 'text', headerClass: 'w-1/4' },
  { label: 'Role', field: 'role', type: 'text', headerClass: 'w-1/6' },
  { label: 'Status', field: 'status', type: 'badge', headerClass: 'w-1/8' },
  { label: 'Actions', type: 'actions', headerClass: 'w-1/6' }
];

// Chart Data (from Analytics.vue)
const mixedChartData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Bookings',
      data: [45, 52, 48, 65, 70, 68, 75, 80, 72, 85, 90, 95],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2
    },
    {
      label: 'Revenue (x1000 EGP)',
      data: [120, 145, 135, 180, 195, 185, 210, 225, 205, 240, 255, 270],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 2
    }
  ]
}));

const mixedChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  }
};

const polarAreaChartData = computed(() => ({
  labels: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
  datasets: [{
    label: 'Bookings',
    data: [
      bookings.value.filter(b => b.status === 'confirmed').length,
      bookings.value.filter(b => b.status === 'pending').length,
      bookings.value.filter(b => b.status === 'cancelled').length,
      bookings.value.filter(b => b.status === 'completed').length
    ],
    backgroundColor: [
      'rgba(16, 185, 129, 0.7)',
      'rgba(251, 191, 36, 0.7)',
      'rgba(239, 68, 68, 0.7)',
      'rgba(107, 114, 128, 0.7)'
    ],
    borderWidth: 2
  }]
}));

const polarAreaChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
};

onMounted(() => {
  fetchAllData();
});
</script>
