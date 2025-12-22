<template>
  <div class="space-y-6 p-6">
    <!-- Stats Cards -->
    <StatsCard :stats="stats" />

    <!-- Data Table -->
    <DataTable
      title="Trips"
      :columns="columns"
      :data="trips"
      :show-filter="true"
      add-button-text="Add New Trip"
      :show-actions="{ edit: true, delete: true, view: true }"
      empty-message="No trips available"
      :per-page="8"
      resource="trips"
      :loading="loading"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
      @view="handleView"
      @toggle="handleToggle"
      @status-click="handleStatusClick"
      @status-change="handleStatusChange"
      @filter="handleFilter"
      v-model:data="trips"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import DataTable from '@/components/Dashboard/DataTable.vue';
import StatsCard from '@/components/Dashboard/StatsCard.vue';
import { tripsAPI } from '@/Services/dashboardApi';

// State
const trips = ref([]);
const loading = ref(false);

// Table columns configuration
const columns = [
  {
    label: 'Trip',
    field: 'image',
    type: 'image',
    showNameWithImage: true,
    headerClass: 'w-1/4'
  },
  {
    label: 'Price',
    field: 'price',
    type: 'text',
    format: (val) => `${val}$`,
    headerClass: 'w-1/6'
  },
  {
    label: 'Duration',
    field: 'duration',
    type: 'text',
    headerClass: 'w-1/6'
  },
  {
    label: 'Capacity',
    field: 'maxPeople',
    type: 'text',
    headerClass: 'w-1/8'
  },
  {
    label: 'Featured',
    field: 'isFeatured',
    type: 'toggle',
    headerClass: 'w-1/8'
  },
  {
    label: 'Status',
    field: 'status',
    type: 'status-dropdown',
    options: ['Active', 'Pending', 'Disabled', 'Suspended'],
    headerClass: 'w-1/8'
  },
  {
    label: 'Action',
    type: 'actions',
    headerClass: 'w-1/8'
  }
];

// Computed stats
const stats = computed(() => {
  const total = trips.value.length;
  const active = trips.value.filter(t => t.status === 'Active').length;
  const featured = trips.value.filter(t => t.isFeatured).length;
  const highRated = trips.value.filter(t => t.rating >= 4.5).length;

  return [
    {
      label: 'Total Trips',
      value: total,
      icon: 'total',
      trend: 5
    },
    {
      label: 'Active Trips',
      value: active,
      icon: 'active',
      trend: 3
    },
    {
      label: 'Featured',
      value: featured,
      icon: 'featured',
      trend: -2
    },
    {
      label: 'High Rated',
      value: highRated,
      icon: 'available',
      trend: 8
    }
  ];
});

// Fetch trips from API
const fetchTrips = async () => {
  loading.value = true;
  try {
    const response = await tripsAPI.getAll();
    
    // Transform data to match table requirements
    trips.value = response.data.map(trip => ({
      ...trip,
      name: trip.title, // Map title to name for DataTable display requirements if needed
      image: trip.image || trip.images?.[0] || '/placeholder-trip.jpg',
      price: trip.price || 0,
      duration: trip.duration || 'N/A',
      maxPeople: trip.maxPeople || 0,
      isFeatured: trip.isFeatured ?? false,
      status: trip.status || 'Active',
      rating: trip.rating || 0
    }));
  } catch (error) {
    console.error('Error fetching trips:', error);
  } finally {
    loading.value = false;
  }
};

// Event handlers
const handleAdd = () => {
  console.log('Add new trip');
  // TODO: Open modal or navigate to add page
};

const handleEdit = (row) => {
  console.log('Edit trip:', row);
  // TODO: Open edit modal or navigate to edit page
};

const handleDelete = async (row) => {
  if (confirm(`Are you sure you want to delete "${row.title}"?`)) {
    try {
      await tripsAPI.delete(row.id);
      await fetchTrips(); // Refresh data
      console.log('Deleted trip:', row);
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip');
    }
  }
};

const handleView = (row) => {
  console.log('View trip:', row);
  // TODO: Navigate to trip details page
};

const handleToggle = async ({ row, field, newValue }) => {
  try {
    // Update the featured status
    if (field === 'isFeatured') {
      await tripsAPI.toggleFeatured(row.id, newValue);
    }
    console.log(`Toggled ${field} for ${row.name} to ${newValue}`);
  } catch (error) {
    console.error('Error toggling featured:', error);
    // Revert the change
    await fetchTrips();
  }
};

const handleStatusClick = async ({ row, field, value }) => {
  // Trips don't have availability field like attractions, but if they did:
  /*
  if (field === 'availability') {
    const newAvailability = value === 'Available' ? 'Sold Out' : 'Available';
    // ... logic
  }
  */
};

const handleStatusChange = async ({ row, field, newValue }) => {
  try {
    // Update the status
    if (field === 'status') {
      await tripsAPI.updateStatus(row.id, newValue);
    }
    console.log(`Changed ${field} for ${row.name} to ${newValue}`);
  } catch (error) {
    console.error('Error updating status:', error);
    // Revert the change
    await fetchTrips();
  }
};

const handleFilter = () => {
  console.log('Open filter modal');
  // TODO: Implement filter functionality
};

// Lifecycle
onMounted(() => {
  fetchTrips();
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
