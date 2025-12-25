<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="glass-morphism rounded-2xl p-8 mb-6 text-center shadow-xl border border-amber-200">
        <h1 class="text-4xl font-bold text-amber-600 mb-3 font-cairo">
          Plan Your Trip to Egypt
        </h1>
        <p class="text-gray-600 text-lg font-cairo">
          Start your adventure in the land of the Pharaohs - Design your perfect journey
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="flex justify-between mb-8 bg-white rounded-xl p-6 shadow-lg">
        <div v-for="step in [1, 2, 3]" :key="step" class="flex items-center flex-1">
          <div :class="[
            'flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all',
            currentStep >= step ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
          ]">
            {{ step }}
          </div>
          <div v-if="step < 3" :class="[
            'flex-1 h-1 mx-2',
            currentStep > step ? 'bg-amber-600' : 'bg-gray-200'
          ]"></div>
        </div>
      </div>

      <!-- Form Steps -->
      <div class="glass-morphism rounded-2xl p-8 shadow-xl border border-amber-200">
        
        <!-- Step 1: Basic Info -->
        <div v-if="currentStep === 1" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-amber-600 inline-block font-cairo">
            📍 Basic Information
          </h2>

          <div>
            <label class="block text-gray-700 font-semibold mb-2 font-cairo">
              Choose Your Destination
            </label>
            <select 
              v-model="formData.headingTo"
              :disabled="isLoadingDestinations"
              class="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-600 focus:outline-none text-lg font-cairo"
            >
              <option v-if="isLoadingDestinations" value="">Loading destinations...</option>
              <option 
                v-for="city in egyptianCities" 
                :key="city.name || city" 
                :value="city.name || city"
              >
                {{ city.displayName || city }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 font-semibold mb-2 font-cairo">
                Start Date
              </label>
              <input 
                type="date"
                v-model="formData.startDate"
                class="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-600 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2 font-cairo">
                End Date
              </label>
              <input 
                type="date"
                v-model="formData.endDate"
                class="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-600 focus:outline-none"
              />
            </div>
          </div>

          <div v-if="calculateDays() > 0" class="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 text-center">
            <p class="text-amber-800 font-bold text-xl font-cairo">
              ⏱️ Trip Duration: {{ calculateDays() }} Days
            </p>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2 font-cairo">
              Number of Travelers
            </label>
            <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <button 
                @click="formData.travelers = Math.max(1, formData.travelers - 1)"
                class="w-12 h-12 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all"
              >
                -
              </button>
              <span class="text-3xl font-bold text-gray-800 flex-1 text-center">
                {{ formData.travelers }}
              </span>
              <button 
                @click="formData.travelers++"
                class="w-12 h-12 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: Preferences -->
        <div v-if="currentStep === 2" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-amber-600 inline-block font-cairo">
            ⚙️ Your Preferences
          </h2>

          <div>
            <label class="block text-gray-700 font-semibold mb-3 font-cairo">
              Who are you traveling with?
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="option in withWhomOptions"
                :key="option.value"
                @click="formData.withWhom = option.value"
                :class="[
                  'p-4 rounded-xl border-2 transition-all text-center',
                  formData.withWhom === option.value
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white border-amber-300 text-gray-700 hover:border-amber-500'
                ]"
              >
                <div class="text-3xl mb-2">{{ option.icon }}</div>
                <div class="text-sm font-semibold font-cairo">{{ option.label }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-3 font-cairo">
              Your Travel Style (Select one or more)
            </label>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
              <button
                v-for="option in travelStyleOptions"
                :key="option.id"
                @click="toggleTravelStyle(option.id)"
                :class="[
                  'p-4 rounded-xl border-2 transition-all text-center',
                  formData.travelStyle.includes(option.id)
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white border-amber-300 text-gray-700 hover:border-amber-500'
                ]"
              >
                <div class="text-3xl mb-2">{{ option.icon }}</div>
                <div class="text-sm font-semibold font-cairo">{{ option.label }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-3 font-cairo">
              Travel Pace
            </label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                v-for="option in travelPaceOptions"
                :key="option.value"
                @click="formData.travelPace = option.value"
                :class="[
                  'p-6 rounded-xl border-2 transition-all',
                  formData.travelPace === option.value
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white border-amber-300 text-gray-700 hover:border-amber-500'
                ]"
              >
                <div class="text-4xl mb-2">{{ option.icon }}</div>
                <div class="font-bold text-lg mb-1 font-cairo">{{ option.label }}</div>
                <div class="text-sm opacity-80 font-cairo">{{ option.desc }}</div>
              </button>
            </div>
          </div>

        </div>

        <!-- Step 3: Budget & Review -->
        <div v-if="currentStep === 3" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-4 border-amber-600 inline-block font-cairo">
            � Final Details & Review
          </h2>

          <div>
            <label class="block text-gray-700 font-semibold mb-3 font-cairo">
              Accommodation Type
            </label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                v-for="option in accommodationOptions"
                :key="option.value"
                @click="formData.accommodation = option.value"
                :class="[
                  'p-6 rounded-xl border-2 transition-all',
                  formData.accommodation === option.value
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white border-amber-300 text-gray-700 hover:border-amber-500'
                ]"
              >
                <div class="text-4xl mb-2">{{ option.icon }}</div>
                <div class="font-bold text-lg mb-1 font-cairo">{{ option.label }}</div>
                <div class="text-sm opacity-80 font-cairo">{{ option.desc }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-3 font-cairo">
              Daily Rhythm Preference
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                v-for="option in daysRhythmOptions"
                :key="option.value"
                @click="formData.daysRhythm = option.value"
                :class="[
                  'p-6 rounded-xl border-2 transition-all',
                  formData.daysRhythm === option.value
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white border-amber-300 text-gray-700 hover:border-amber-500'
                ]"
              >
                <div class="text-4xl mb-2">{{ option.icon }}</div>
                <div class="font-bold text-lg mb-1 font-cairo">{{ option.label }}</div>
                <div class="text-sm opacity-80 font-cairo">{{ option.desc }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-3 font-cairo">
              Special Requests or Additional Needs
            </label>
            <textarea
              v-model="formData.otherNeeds"
              rows="4"
              placeholder="Tell us about any specific interests, accessibility needs, dietary restrictions, or anything else we should know..."
              class="w-full p-4 border-2 border-amber-300 rounded-xl focus:border-amber-600 focus:outline-none font-cairo"
            ></textarea>
          </div>

          <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-300">
            <h3 class="font-bold text-xl text-gray-800 mb-4 font-cairo">
              📋 Your Trip Summary
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Destination:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ formData.headingTo }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Duration:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ calculateDays() }} Days</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Travelers:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ formData.travelers }} People</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Traveling With:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ getWithWhomLabel() }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Accommodation:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ getAccommodationLabel() }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Travel Styles:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ formData.travelStyle.length }} Selected</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Pace:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ formData.travelPace }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                <span class="text-gray-600 font-cairo">Daily Rhythm:</span>
                <span class="font-bold text-gray-800 font-cairo">{{ formData.daysRhythm }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8 pt-6 border-t-2 border-gray-200">
          <button 
            v-if="currentStep > 1"
            @click="currentStep--"
            class="px-8 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-all flex items-center gap-2 font-cairo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <div class="flex-1"></div>
          
          <button 
            v-if="currentStep < 3"
            @click="currentStep++"
            class="px-8 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all flex items-center gap-2 font-cairo"
          >
            Next
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button 
            v-else
            @click="handleSubmit"
            :disabled="isGeneratingPlan"
            :class="[
              'px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 text-lg font-cairo',
              isGeneratingPlan 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            ]"
          >
            <svg v-if="!isGeneratingPlan" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isGeneratingPlan ? 'Planning Your Perfect Trip...' : 'Plan My Trip Now!' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aiPlannerService from '@/Services/aiPlannerService';

export default {
  name: 'TripPlanningForm',
  data() {
    return {
      currentStep: 1,
      isGeneratingPlan: false,
      formData: {
        headingTo: '',
        startDate: '',
        endDate: '',
        travelers: 2,
        withWhom: 'Couple',
        travelStyle: [],
        travelPace: 'Moderate',
        accommodation: 'Luxury',
        daysRhythm: 'EarlyStart',
        otherNeeds: ''
      },
      egyptianCities: [],
      isLoadingDestinations: false,
      travelStyleOptions: [
        { id: 'Historical', label: 'Historical Sites', icon: '🏛️' },
        { id: 'Beach', label: 'Beach & Water', icon: '🏖️' },
        { id: 'Culinary', label: 'Food & Cuisine', icon: '🍽️' },
        { id: 'Shopping', label: 'Shopping & Bazaars', icon: '🛍️' },
        { id: 'Adventure', label: 'Adventure Activities', icon: '🎿' },
        { id: 'Cultural', label: 'Culture & Arts', icon: '🎭' },
        { id: 'Relaxation', label: 'Relaxation & Spa', icon: '🧘' },
        { id: 'Nightlife', label: 'Nightlife', icon: '🌃' },
        { id: 'Nature', label: 'Nature & Wildlife', icon: '🌿' },
        { id: 'Cityscape', label: 'Urban Exploration', icon: '🏙️' }
      ],
      withWhomOptions: [
        { value: 'Solo', label: 'Solo Travel', icon: '🧳', desc: 'Just me' },
        { value: 'Couple', label: 'Couple', icon: '💑', desc: 'Romantic trip' },
        { value: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'With family' },
        { value: 'Friends', label: 'Friends', icon: '👥', desc: 'Group of friends' }
      ],
      accommodationOptions: [
        { value: 'Budget', label: 'Budget', icon: '💰', desc: 'Hostels & Simple Hotels' },
        { value: 'Moderate', label: 'Moderate', icon: '🏨', desc: '3-4 Star Hotels' },
        { value: 'Luxury', label: 'Luxury', icon: '⭐', desc: '5 Star Hotels' }
      ],
      travelPaceOptions: [
        { value: 'Slow', label: 'Slow & Relaxed', icon: '🐢', desc: 'Take it easy' },
        { value: 'Moderate', label: 'Moderate', icon: '🚶', desc: 'Balanced pace' },
        { value: 'Fast', label: 'Fast & Packed', icon: '🏃', desc: 'See everything' }
      ],
      daysRhythmOptions: [
        { value: 'EarlyStart', label: 'Early Bird', icon: '🌅', desc: 'Start early, end early' },
        { value: 'Standard', label: 'Standard', icon: '☀️', desc: 'Normal schedule' },
        { value: 'LateStart', label: 'Night Owl', icon: '🌙', desc: 'Late start, late end' },
        { value: 'Flexible', label: 'Flexible', icon: '🔄', desc: 'No fixed schedule' }
      ]
    };
  },
  mounted() {
    this.loadDestinations();
  },
  methods: {
    async loadDestinations() {
      this.isLoadingDestinations = true;
      try {
        const destinations = await aiPlannerService.getDestinations();
        this.egyptianCities = destinations.length > 0 ? destinations : [
          'Cairo', 'Alexandria', 'Luxor', 'Aswan', 'Sharm El Sheikh', 
          'Hurghada', 'Dahab', 'Marsa Alam', 'Siwa Oasis'
        ];
        if (this.egyptianCities.length > 0 && !this.formData.headingTo) {
          // If cities are objects, use the 'name' property; otherwise use the string directly
          this.formData.headingTo = this.egyptianCities[0].name || this.egyptianCities[0];
        }
      } catch (error) {
        console.error('Error loading destinations:', error);
        this.egyptianCities = [
          'Cairo', 'Alexandria', 'Luxor', 'Aswan', 'Sharm El Sheikh', 
          'Hurghada', 'Dahab', 'Marsa Alam', 'Siwa Oasis'
        ];
        this.formData.headingTo = this.egyptianCities[0];
      } finally {
        this.isLoadingDestinations = false;
      }
    },
    toggleTravelStyle(style) {
      const index = this.formData.travelStyle.indexOf(style);
      if (index > -1) {
        this.formData.travelStyle.splice(index, 1);
      } else {
        this.formData.travelStyle.push(style);
      }
    },
    calculateDays() {
      if (this.formData.startDate && this.formData.endDate) {
        const start = new Date(this.formData.startDate);
        const end = new Date(this.formData.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
      }
      return 0;
    },
    getAccommodationLabel() {
      const option = this.accommodationOptions.find(opt => opt.value === this.formData.accommodation);
      return option ? option.label : '';
    },
    getWithWhomLabel() {
      const option = this.withWhomOptions.find(opt => opt.value === this.formData.withWhom);
      return option ? option.label : '';
    },
    async handleSubmit() {
      // Format data to match TripSearchCriteria DTO
      const tripCriteria = {
        headingTo: this.formData.headingTo,
        startDate: new Date(this.formData.startDate).toISOString(),
        endDate: new Date(this.formData.endDate).toISOString(),
        travelers: this.formData.travelers,
        withWhom: this.formData.withWhom,
        travelStyle: this.formData.travelStyle,
        travelPace: this.formData.travelPace,
        accommodation: this.formData.accommodation,
        daysRhythm: this.formData.daysRhythm,
        otherNeeds: this.formData.otherNeeds
      };
      
      console.log('Trip Criteria JSON:', JSON.stringify(tripCriteria, null, 2));
      
      this.isGeneratingPlan = true;
      
      try {
        // Call the AI planner service
        const result = await aiPlannerService.generateTripPlan(tripCriteria);
        console.log('AI Trip Plan Result:', result);
        
        // Store in sessionStorage for retrieval in result page
        sessionStorage.setItem('tripPlanData', JSON.stringify(result));
        
        // Navigate to results page
        this.$router.push({ name: 'AiPlannerResult' });
      } catch (error) {
        console.error('Error generating trip plan:', error);
        alert('❌ Failed to generate trip plan. Please try again.');
      } finally {
        this.isGeneratingPlan = false;
      }
    }
  }
};
</script>

<style scoped>
.glass-morphism {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.font-cairo {
  font-family: 'Cairo', sans-serif;
}
</style>