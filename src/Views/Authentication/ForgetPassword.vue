<template>
  <div class="forgot-password-container">
    <!-- Left Side - Pyramid Image -->
    <div class="left-side">
      <div class="pyramid-overlay"></div>
    </div>

    <!-- Right Side - Forgot Password Form -->
    <div class="right-side">
      <div class="form-container">
        <!-- Logo/Title -->
        <h1 class="brand-title">NËLARIA</h1>

        <!-- Step Indicator (optional) -->
        <div class="step-indicator">
          <div class="step" :class="{ 'active': currentStep === 'email' || currentStep === 'token' || currentStep === 'password' || currentStep === 'success' }">1</div>
          <div class="step-line" :class="{ 'active': currentStep === 'token' || currentStep === 'password' || currentStep === 'success' }"></div>
          <div class="step" :class="{ 'active': currentStep === 'token' || currentStep === 'password' || currentStep === 'success' }">2</div>
          <div class="step-line" :class="{ 'active': currentStep === 'password' || currentStep === 'success' }"></div>
          <div class="step" :class="{ 'active': currentStep === 'password' || currentStep === 'success' }">3</div>
        </div>

        <!-- Step 1: Enter Your Code (Email) -->
        <div v-if="currentStep === 'email'" class="form-step">
          <h2 class="step-title">Enter Your Code</h2>
          <p class="step-description">Enter the email associated with your account</p>

          <form @submit.prevent="handleSendToken" class="forgot-form">
            <div class="form-group">
              <input 
                type="email" 
                v-model="formData.email"
                placeholder="example@email.com"
                class="form-input"
                :class="{ 'error': errors.email }"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
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
              <span v-if="!isLoading">Send Reset Code</span>
              <span v-else>Sending...</span>
            </button>
          </form>

          <!-- Back to login -->
          <div class="back-link">
            Remember your password? 
            <a href="#" @click.prevent="navigateToLogin">Back to Sign In</a>
          </div>
        </div>

        <!-- Step 2: Enter Your Code (Token Verification) -->
        <div v-if="currentStep === 'token'" class="form-step">
          <h2 class="step-title">Enter Your Code</h2>
          <p class="step-description">Enter the 6-digit code sent to your email</p>

          <form @submit.prevent="handleVerifyToken" class="forgot-form">
            <div class="form-group">
              <input 
                type="text" 
                v-model="formData.resetToken"
                placeholder="000000"
                class="form-input code-input"
                :class="{ 'error': errors.resetToken }"
                maxlength="6"
              />
              <span v-if="errors.resetToken" class="error-message">{{ errors.resetToken }}</span>
            </div>

            <!-- Resend option -->
            <div class="resend-container">
              <button 
                type="button" 
                @click="handleResendToken"
                class="resend-btn"
                :disabled="resendCooldown > 0"
              >
                {{ resendCooldown > 0 ? `Resend after ${resendCooldown}s` : 'Resend Code' }}
              </button>
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
              <span v-if="!isLoading">Verify Code</span>
              <span v-else>Verifying...</span>
            </button>
          </form>
        </div>

        <!-- Step 3: Reset Password -->
        <div v-if="currentStep === 'password'" class="form-step">
          <h2 class="step-title">Create New Password</h2>
          <p class="step-description">Enter your new password below</p>

          <form @submit.prevent="handleResetPassword" class="forgot-form">
            <!-- New Password -->
            <div class="form-group">
              <label class="form-label">New Password</label>
              <div class="password-wrapper">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="formData.newPassword"
                  placeholder="At least 8 characters" 
                  class="form-input"
                  :class="{ 'error': errors.newPassword }"
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
              <span v-if="errors.newPassword" class="error-message">{{ errors.newPassword }}</span>
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
              <label class="form-label">Confirm Password</label>
              <div class="password-wrapper">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="formData.confirmPassword"
                  placeholder="At least 8 characters" 
                  class="form-input"
                  :class="{ 'error': errors.confirmPassword }"
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
              <span v-if="!isLoading">Reset Password</span>
              <span v-else>Resetting...</span>
            </button>
          </form>
        </div>

        <!-- Step 4: Success -->
        <div v-if="currentStep === 'success'" class="form-step success-step">
          <div class="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 class="step-title">Congratulations!</h2>
          <p class="step-description">Your password has been reset successfully</p>

          <button 
            @click="navigateToLogin"
            class="submit-btn"
          >
            Go to Sign In
          </button>
        </div>

        <!-- Auth Links -->
        <div v-if="currentStep !== 'success'" class="auth-links">
          <a href="#" @click.prevent="navigateToLogin">Sign In</a>
          <span class="separator">|</span>
          <a href="#" @click.prevent="navigateToSignUp">Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '@/Services/api';

const router = useRouter();

const currentStep = ref('email'); // email, token, password, success
const formData = reactive({
  email: '',
  resetToken: '',
  newPassword: '',
  confirmPassword: ''
});

const errors = reactive({
  email: '',
  resetToken: '',
  newPassword: '',
  confirmPassword: ''
});

const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const resendCooldown = ref(0);
let cooldownInterval = null;

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToSignUp = () => {
  router.push('/signup');
};

const startCooldown = () => {
  resendCooldown.value = 60;
  cooldownInterval = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownInterval);
    }
  }, 1000);
};

const handleSendToken = async () => {
  errorMessage.value = '';
  errors.email = '';
  
  if (!formData.email) {
    errors.email = 'Email is required';
    return;
  }
  
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
    return;
  }
  
  isLoading.value = true;
  
  const result = await authApi.forgotPassword(formData.email);
  
  isLoading.value = false;
  
  if (result.success) {
    currentStep.value = 'token';
    startCooldown();
    // في التطوير فقط - عرض الرمز
    console.log('Reset Token:', result.resetToken);
  } else {
    errorMessage.value = result.message;
  }
};

const handleResendToken = async () => {
  if (resendCooldown.value > 0) return;
  await handleSendToken();
};

const handleVerifyToken = () => {
  errorMessage.value = '';
  errors.resetToken = '';
  
  if (!formData.resetToken) {
    errors.resetToken = 'Reset Token is required';
    return;
  }
  
  if (formData.resetToken.length !== 6) {
    errors.resetToken = 'Reset Token must be 6 digits';
    return;
  }
  
  currentStep.value = 'password';
};

const handleResetPassword = async () => {
  errorMessage.value = '';
  errors.newPassword = '';
  errors.confirmPassword = '';
  
  if (!formData.newPassword) {
    errors.newPassword = 'New Password is required';
    return;
  }
  
  if (formData.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters';
    return;
  }
  
  if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    return;
  }
  
  isLoading.value = true;
  
  const result = await authApi.resetPassword(
    formData.email,
    formData.resetToken,
    formData.newPassword
  );
  
  isLoading.value = false;
  
  if (result.success) {
    currentStep.value = 'success';
  } else {
    errorMessage.value = result.message;
  }
};

onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval);
  }
});
</script>

<style scoped>
.forgot-password-container {
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
}

.form-container {
  width: 100%;
  max-width: 440px;
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

/* Step Indicator */
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  gap: 0;
}

.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E0E0E0;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.step.active {
  background: #C86A3F;
  color: white;
}

.step-line {
  width: 60px;
  height: 2px;
  background: #E0E0E0;
  transition: all 0.3s ease;
}

.step-line.active {
  background: #C86A3F;
}

/* Form Step */
.form-step {
  text-align: center;
}

.step-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
}

.step-description {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

/* Form */
.forgot-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
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

.code-input {
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.5em;
  font-weight: 600;
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

.resend-container {
  text-align: center;
  margin-bottom: 1.5rem;
}

.resend-btn {
  background: none;
  border: none;
  color: #C86A3F;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.resend-btn:disabled {
  color: #999;
  cursor: not-allowed;
  text-decoration: none;
}

.alert-error {
  background: #FDEDEC;
  color: #E74C3C;
  padding: 0.875rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid #E74C3C;
  text-align: left;
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

.back-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.back-link a {
  color: #C86A3F;
  text-decoration: none;
  font-weight: 600;
}

.back-link a:hover {
  text-decoration: underline;
}

/* Success Step */
.success-step {
  padding: 2rem 0;
}

.success-icon {
  margin: 0 auto 1.5rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
}

/* Auth Links */
.auth-links {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
}

.auth-links a {
  color: #C86A3F;
  text-decoration: none;
  font-weight: 500;
}

.auth-links a:hover {
  text-decoration: underline;
}

.separator {
  margin: 0 1rem;
  color: #CCC;
}

/* Responsive */
@media (max-width: 768px) {
  .forgot-password-container {
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
  
  .step-title {
    font-size: 1.5rem;
  }
}
</style>