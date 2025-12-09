import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authApi } from '@/Services/api';

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null);
    const token = ref(localStorage.getItem('token') || null);
    const isLoading = ref(false);
    const error = ref(null);

    // Getters
    const isAuthenticated = computed(() => !!token.value && !!user.value);
    const currentUser = computed(() => user.value);
    const userFullName = computed(() =>
        user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
    );

    // Actions
    const setToken = (newToken) => {
        token.value = newToken;
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    const setUser = (userData) => {
        user.value = userData;
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    // تسجيل الدخول
    const login = async (credentials) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await authApi.login(credentials.email, credentials.password);

            if (response.success) {
                setToken(response.token);
                setUser(response.user);
                return { success: true, user: response.user };
            } else {
                error.value = response.message || 'فشل تسجيل الدخول';
                return { success: false, message: error.value };
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'حدث خطأ في الاتصال';
            return { success: false, message: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // إنشاء حساب جديد
    const signup = async (userData) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await authApi.signup(userData);

            if (response.success) {
                setToken(response.token);
                setUser(response.user);
                return { success: true, user: response.user };
            } else {
                error.value = response.message || 'فشل إنشاء الحساب';
                return { success: false, message: error.value };
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'حدث خطأ في الاتصال';
            return { success: false, message: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // تسجيل الخروج
    const logout = () => {
        setToken(null);
        setUser(null);
        error.value = null;
    };

    // استعادة كلمة المرور - إرسال رمز
    const requestPasswordReset = async (email) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await authApi.forgotPassword(email);

            if (response.success) {
                return { success: true, message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' };
            } else {
                error.value = response.message || 'فشل إرسال رمز التحقق';
                return { success: false, message: error.value };
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'حدث خطأ في الاتصال';
            return { success: false, message: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // إعادة تعيين كلمة المرور
    const resetPassword = async (resetData) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await authApi.resetPassword(
                resetData.email,
                resetData.resetToken,
                resetData.newPassword
            );

            if (response.success) {
                return { success: true, message: 'تم تغيير كلمة المرور بنجاح' };
            } else {
                error.value = response.message || 'فشل تغيير كلمة المرور';
                return { success: false, message: error.value };
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'حدث خطأ في الاتصال';
            return { success: false, message: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // استرجاع بيانات المستخدم المحفوظة
    const initAuth = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser && token.value) {
            try {
                user.value = JSON.parse(savedUser);
            } catch (err) {
                logout();
            }
        }
    };

    // تحديث بيانات المستخدم
    const updateProfile = async (updates) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await api.patch(`/users/${user.value.id}`, updates);

            if (response.data) {
                setUser(response.data);
                return { success: true, user: response.data };
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'فشل تحديث البيانات';
            return { success: false, message: error.value };
        } finally {
            isLoading.value = false;
        }
    };

    // مسح الأخطاء
    const clearError = () => {
        error.value = null;
    };

    return {
        // State
        user,
        token,
        isLoading,
        error,

        // Getters
        isAuthenticated,
        currentUser,
        userFullName,

        // Actions
        login,
        signup,
        logout,
        requestPasswordReset,
        resetPassword,
        initAuth,
        updateProfile,
        clearError
    };
});