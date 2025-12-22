<template>
  <!-- Footer -->
  <footer class="bg-base-200 py-12">
    <div class="page-container mx-auto max-w-7xl px-4 md:px-0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <div class="lg:col-span-1">
          <router-link to="/" class="text-2xl font-bold text-primary font-cairo mb-4 block">PYRAMIS</router-link>
          <p class="font-cairo text-base-content/70 mb-4 text-sm">Book your next adventure in Egypt with us!</p>
          <div class="space-y-2">
            <div class="flex items-start text-base-content/70">
              <i class="fas fa-map-marker-alt mr-3 text-primary mt-1"></i>
              <span class="font-cairo text-sm">456 Nile Avenue, Cairo, Egypt 12345</span>
            </div>
            <div class="flex items-center text-base-content/70">
              <i class="fas fa-phone mr-3 text-primary"></i>
              <span class="font-cairo text-sm">+20 (123) 456-7890</span>
            </div>
            <div class="flex items-center text-base-content/70">
              <i class="fas fa-envelope mr-3 text-primary"></i>
              <span class="font-cairo text-sm">Pyramis@Pyramis.Com</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="font-cairo font-bold text-base-content mb-4">Explore</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/hotels/list" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors" active-class="text-primary font-semibold">Hotels</router-link>
            </li>
            <li>
              <router-link to="/trips/list" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors" active-class="text-primary font-semibold">Trips</router-link>
            </li>
            <li>
              <router-link to="/attractions/list" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors" active-class="text-primary font-semibold">Attractions</router-link>
            </li>
            <li>
              <router-link to="/cars/list" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors" active-class="text-primary font-semibold">Cars</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-cairo font-bold text-base-content mb-4">Company</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors" active-class="text-primary font-semibold">About Us</router-link>
            </li>
            <li>
              <router-link to="/" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">How it Works</router-link>
            </li>
            <li>
              <router-link to="/contact-us" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors" active-class="text-primary font-semibold">Contact</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-cairo font-bold text-base-content mb-4">Help & Trust</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">FAQ</router-link>
            </li>
            <li>
              <router-link to="/dashboard/support" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors" active-class="text-primary font-semibold">Support</router-link>
            </li>
            <li>
              <router-link to="/" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Cancellation Policy</router-link>
            </li>
            <li>
              <router-link to="/" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Terms & Privacy</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-cairo font-bold text-base-content mb-4">Payment</h4>
          <div class="flex gap-2 mb-6">
            <div class="w-12 h-8 bg-primary rounded flex items-center justify-center">
              <i class="fab fa-cc-mastercard text-white text-xl"></i>
            </div>
            <div class="w-12 h-8 bg-primary rounded flex items-center justify-center">
              <i class="fab fa-cc-visa text-white text-xl"></i>
            </div>
            <div class="w-12 h-8 bg-primary rounded flex items-center justify-center">
              <i class="fab fa-cc-mastercard text-white text-xl"></i>
            </div>
          </div>
          <h4 class="font-cairo font-bold text-base-content mb-3">Follow us on:</h4>
          <div class="flex gap-3">
            <a href="https://instagram.com" target="_blank" class="w-10 h-10 bg-primary rounded flex items-center justify-center hover:bg-primary/80 transition-colors">
              <i class="fab fa-instagram text-white text-lg"></i>
            </a>
            <a href="https://facebook.com" target="_blank" class="w-10 h-10 bg-primary rounded flex items-center justify-center hover:bg-primary/80 transition-colors">
              <i class="fab fa-facebook-f text-white text-lg"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="border-t border-base-300 pt-6 text-center">
        <p class="font-cairo text-sm text-base-content/70">© 2025 PYRAMIS. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No reactive state needed for now
</script>

<style scoped>
.font-cairo {
  font-family: 'Cairo', sans-serif;
}
</style>