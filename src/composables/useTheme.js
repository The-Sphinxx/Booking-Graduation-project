import { ref, watch } from 'vue';

export function useTheme() {
    const isDark = ref(false);

    // Apply theme to DOM synchronously using DaisyUI data-theme
    const applyTheme = () => {
        const html = document.documentElement;
        if (isDark.value) {
            html.setAttribute('data-theme', 'nileheritageDark');
            html.classList.add('dark');
        } else {
            html.setAttribute('data-theme', 'nileheritage');
            html.classList.remove('dark');
        }
    };

    // Initialization Logic
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Use saved preference
            isDark.value = savedTheme === 'dark';
        } else {
            // Check system preference
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // Save the detected system preference to localStorage
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
        }
        
        applyTheme();
    };

    // Toggle Logic
    const toggleTheme = () => {
        isDark.value = !isDark.value;
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    };

    // Watch for isDark changes and apply theme
    watch(
        () => isDark.value,
        () => {
            applyTheme();
        }
    );

    return { isDark, toggleTheme, initializeTheme };
}