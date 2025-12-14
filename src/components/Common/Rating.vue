<template>
  <div class="bg-base-100 rounded-lg shadow-lg p-8">
    <h2 class="text-3xl font-bold mb-6 text-base-content border-l-4 border-primary pl-4">
      Guest Ratings
    </h2>
    
    <div v-if="!reviews" class="alert alert-info">
      <span>No reviews available yet</span>
    </div>
    
    <div v-else class="flex flex-col lg:flex-row gap-8">
      <!-- Overall Rating Section -->
      <div class="flex flex-col items-center justify-center min-w-[220px] bg-base-200 rounded-lg p-6">
        <div class="text-7xl font-bold text-primary mb-2">
          {{ reviews.overallRating.toFixed(1) }}
        </div>
        <div class="text-xl font-semibold mb-1">{{ ratingLabel }}</div>
        <div class="text-sm text-base-content/60">
          Based on {{ reviews.totalReviews }} reviews
        </div>
      </div>

      <!-- Rating Criteria Section -->
      <div class="flex-1 space-y-4">
        <div 
          v-for="criterion in displayCriteria" 
          :key="criterion.key"
          class="flex items-center gap-4"
        >
          <div class="min-w-[140px] text-base font-medium">
            {{ criterion.label }}
          </div>
          
          <!-- Progress Bar -->
          <div class="flex-1 flex items-center gap-3">
            <div class="flex-1 bg-base-200 rounded-full h-3 overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500"
                :class="getBarColor(criterion.value)"
                :style="{ width: `${(criterion.value / maxRating) * 100}%` }"
              ></div>
            </div>
            <div class="min-w-[40px] text-right font-semibold">
              {{ criterion.value.toFixed(1) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  reviews: {
    type: Object,
    required: false,
    default: null,
    validator: (value) => {
      if (!value) return true;
      return (
        typeof value.overallRating === 'number' &&
        typeof value.totalReviews === 'number' &&
        typeof value.ratingCriteria === 'object'
      );
    }
  },
  maxRating: {
    type: Number,
    default: 5
  }
});

// Labels mapping for all rating criteria
const criteriaLabels = {
  // Hotel criteria
  cleanliness: 'Cleanliness',
  staff: 'Staff',
  location: 'Location',
  facilities: 'Facilities',
  valueForMoney: 'Value for Money',
  
  // Attraction criteria
  experience: 'Experience',
  accessibility: 'Accessibility',
  
  // Car criteria
  condition: 'Condition',
  comfort: 'Comfort',
  performance: 'Performance',
  
  // Trip criteria
  guide: 'Guide',
  itinerary: 'Itinerary',
  organization: 'Organization'
};

// Convert rating criteria to display format
const displayCriteria = computed(() => {
  if (!props.reviews?.ratingCriteria) return [];
  
  return Object.entries(props.reviews.ratingCriteria).map(([key, value]) => ({
    key,
    label: criteriaLabels[key] || key.charAt(0).toUpperCase() + key.slice(1),
    value: Number(value) || 0
  }));
});

// Get rating label based on overall rating
const ratingLabel = computed(() => {
  if (!props.reviews) return '';
  const rating = props.reviews.overallRating;
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  if (rating >= 3.0) return 'Average';
  return 'Fair';
});

// Get progress bar color based on rating value
const getBarColor = (value) => {
  const percentage = (value / props.maxRating) * 100;
  if (percentage >= 90) return 'bg-gradient-to-r from-warning to-primary';
  if (percentage >= 80) return 'bg-gradient-to-r from-accent to-warning';
  if (percentage >= 70) return 'bg-gradient-to-r from-warning/80 to-accent';
  if (percentage >= 60) return 'bg-warning/70';
  return 'bg-warning/50';
};
</script>

<style scoped>
.transition-all {
  transition: all 0.5s ease-in-out;
}
</style>