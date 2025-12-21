<template>
  <footer class="bg-base-200 py-12">
    <div class="page-container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <div class="lg:col-span-1">
          <h3 class="text-2xl font-bold text-primary font-cairo mb-4">PYRAMIS</h3>
          <p class="font-cairo text-base-content/70 mb-4 text-sm">Book your next adventure in Egypt with us!</p>
          <div class="space-y-2">
            <div class="flex items-start text-base-content/70">
              <i class="fas fa-map-marker-alt mr-3 text-primary mt-1"></i>
              <span class="font-cairo text-sm">456 Nile Avenue, Cairo, Egypt 12345</span>
            </div>
            <div class="flex items-center text-base-content/70">
              <i class="fas fa-phone mr-3 text-primary"></i>
              <span class="font-cairo text-sm">{{ metadata.supportPhone || '+20 (123) 456-7890' }}</span>
            </div>
            <div class="flex items-center text-base-content/70">
              <i class="fas fa-envelope mr-3 text-primary"></i>
              <span class="font-cairo text-sm">{{ metadata.supportEmail || 'Pyramis@Pyramis.Com' }}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 class="font-cairo font-bold text-base-content mb-4">Explore</h4>
          <ul class="space-y-2">
            <li><a href="/hotels" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Hotels</a></li>
            <li><a href="/trips" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Trips</a></li>
            <li><a href="/attractions" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Attractions</a></li>
            <li><a href="/cars" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Cars</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-cairo font-bold text-base-content mb-4">Company</h4>
          <ul class="space-y-2">
            <li><a href="/about" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">About Us</a></li>
            <li><a href="/how-it-works" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">How it Works</a></li>
            <li><a href="/contact" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-cairo font-bold text-base-content mb-4">Help & Trust</h4>
          <ul class="space-y-2">
            <li><a href="/faq" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="/support" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Support</a></li>
            <li><a href="/cancellation" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Cancellation Policy</a></li>
            <li><a href="/terms" class="font-cairo text-sm text-base-content/70 hover:text-primary transition-colors">Terms & Privacy</a></li>
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
        <p class="font-cairo text-sm text-base-content/70">@ 2025 {{ metadata.siteName || 'PYRAMIS' }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const metadata = ref({
  siteName: 'PYRAMIS',
  supportEmail: 'Pyramis@Pyramis.Com',
  supportPhone: '+20 (123) 456-7890'
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

.font-cairo { font-family: 'Cairo', sans-serif; }
</style>
