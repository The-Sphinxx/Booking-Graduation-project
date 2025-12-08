<template>
  <div class="signup-container">
    <!-- Left Side - Pyramid Image -->
    <div class="left-side">
      <div class="pyramid-overlay"></div>
    </div>

    <!-- Right Side - Sign Up Form -->
    <div class="right-side">
      <div class="form-container">
        <!-- Logo/Title -->
        <h1 class="brand-title">NËLARIA</h1>

        <!-- Sign In / Sign Up Toggle -->
        <div class="tab-container">
          <button 
            class="tab-btn" 
            :class="{ 'active': activeTab === 'signin' }"
            @click="navigateToSignIn"
          >
            Sign In
          </button>
          <button 
            class="tab-btn" 
            :class="{ 'active': activeTab === 'signup' }"
            @click="activeTab = 'signup'"
          >
            Sign Up
          </button>
        </div>

        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignup" class="signup-form">
          <!-- Full Name -->
          <div class="form-group">
            <label class="form-label">Full name</label>
            <input 
              type="text" 
              v-model="fullName"
              placeholder="Enter your name"
              class="form-input"
              :class="{ 'error': errors.fullName }"
            />
            <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="form-label">E-Mail</label>
            <input 
              type="email" 
              v-model="formData.email"
              placeholder="example@email.com"
              class="form-input"
              :class="{ 'error': errors.email }"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <!-- Phone Number -->
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input 
              type="tel" 
              v-model="formData.phone"
              placeholder="Enter your number"
              class="form-input"
              :class="{ 'error': errors.phone }"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <!-- Create Password -->
          <div class="form-group">
            <label class="form-label">Create Password</label>
            <div class="password-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="formData.password"
                placeholder="At least 8 characters" 
                class="form-input"
                :class="{ 'error': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="eye-btn"
              >
                <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <!-- Confirm Password -->
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <div class="password-wrapper">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="formData.confirmPassword"
                placeholder="At least 8 characters" 
                class="form-input"
                :class="{ 'error': errors.confirmPassword }"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="eye-btn"
              >
                <svg v-if="!showConfirmPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert-error">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Sign Up</span>
            <span v-else>Loading...</span>
          </button>

          <!-- Divider -->
          <div class="divider">
            <span>Or</span>
          </div>

          <!-- Social Login Buttons -->
          <div class="social-buttons">
            <button type="button" class="social-btn google-btn">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Sign in with Google
            </button>
            
            <button type="button" class="social-btn facebook-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign in with Facebook
            </button>
          </div>

          <!-- Already have account -->
          <div class="signin-link">
            Already have an account? 
            <a href="#" @click.prevent="navigateToSignIn">Sign In</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref('signup');
const fullName = ref('');

const formData = reactive({
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const navigateToSignIn = () => {
  router.push('/login');
};

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach(key => errors[key] = '');
  
  if (!fullName.value.trim()) {
    errors.fullName = 'Full name is required';
    isValid = false;
  }
  
  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
    isValid = false;
  }
  
  if (!formData.phone) {
    errors.phone = 'Phone number is required';
    isValid = false;
  } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Phone number is invalid';
    isValid = false;
  }
  
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
    isValid = false;
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }
  
  return isValid;
};

const handleSignup = async () => {
  errorMessage.value = '';
  
  if (!validateForm()) return;
  
  isLoading.value = true;
  
  // Split full name into firstName and lastName
  const nameParts = fullName.value.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  const userData = {
    firstName,
    lastName,
    email: formData.email,
    phone: formData.phone,
    password: formData.password
  };
  
  const result = await authStore.signup(userData);
  
  isLoading.value = false;
  
  if (result.success) {
    router.push('/');
  } else {
    errorMessage.value = result.message;
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  min-height: 100vh;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* Left Side - Pyramid Image */
.left-side {
  flex: 1;
  position: relative;
  background-image: url('/Signuplogin forgetpassword.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  border-right: 4px solid #4A90E2;
}

.pyramid-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 60%, rgba(205, 154, 91, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 40%, rgba(139, 111, 71, 0.4) 0%, transparent 50%),
    linear-gradient(180deg, rgba(212, 165, 116, 0.1) 0%, rgba(139, 115, 85, 0.3) 100%);
}

.left-side::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(139, 115, 85, 0.6) 0%, transparent 100%);
}

/* Right Side - Form */
.right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FAFAFA;
  padding: 2rem;
  overflow-y: auto;
}

.form-container {
  width: 100%;
  max-width: 440px;
  padding: 1rem 0;
}

/* Brand Title */
.brand-title {
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  color: #C9A96E;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
}

/* Tab Container */
.tab-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab-btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: #666;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: #C86A3F;
  color: white;
  box-shadow: 0 2px 4px rgba(200, 106, 63, 0.3);
}

.tab-btn:hover:not(.active) {
  background: #F5F5F5;
}

/* Form */
.signup-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #C86A3F;
  box-shadow: 0 0 0 3px rgba(200, 106, 63, 0.1);
}

.form-input.error {
  border-color: #E74C3C;
}

.form-input::placeholder {
  color: #B0B0B0;
}

.password-wrapper {
  position: relative;
}

.eye-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.eye-btn:hover {
  color: #666;
}

.error-message {
  display: block;
  color: #E74C3C;
  font-size: 0.8rem;
  margin-top: 0.35rem;
}

.alert-error {
  background: #FDEDEC;
  color: #E74C3C;
  padding: 0.875rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  border-left: 3px solid #E74C3C;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: #C86A3F;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(200, 106, 63, 0.3);
  margin-bottom: 1.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #B55A30;
  box-shadow: 0 4px 12px rgba(200, 106, 63, 0.4);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #999;
  font-size: 0.875rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E0E0E0;
}

.divider span {
  padding: 0 1rem;
}

/* Social Buttons */
.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  border: 1px solid #E0E0E0;
  background: white;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: #F8F8F8;
  border-color: #D0D0D0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.google-btn {
  color: #444;
}

.facebook-btn {
  color: #1877F2;
}

/* Sign In Link */
.signin-link {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.signin-link a {
  color: #C86A3F;
  text-decoration: none;
  font-weight: 600;
}

.signin-link a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .signup-container {
    flex-direction: column;
  }
  
  .left-side {
    min-height: 200px;
    border-right: none;
    border-bottom: 4px solid #4A90E2;
  }
  
  .brand-title {
    font-size: 2.5rem;
  }
}
</style>