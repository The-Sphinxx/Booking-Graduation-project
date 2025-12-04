import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
       fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backdropBlur: {
        
        glass: '20px',
      },
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.1)', 
      },
      borderColor: {
        'glass-border': 'rgba(255, 255, 255, 0.3)',
      },
      boxShadow: {
        'glass-shadow': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'glass-radius': '16px',
      },
    },
  },

  plugins: [
    daisyui,
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)', 
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
          'border-radius': '16px',
          'box-shadow': '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
      });
    }
  ],

  daisyui: {
    themes: [

      {
        nileheritage: {
          "primary": "#C86A41",
          "primary-focus": "#B85F3A",
          "primary-content": "#ffffff",
          "secondary": "#2A6F7A",
          "secondary-focus": "#245F68",
          "secondary-content": "#ffffff",
          "accent": "#D5B77A",
          "accent-focus": "#C3A56C",
          "accent-content": "#3A2D17",
          "neutral": "#3F3F41",
          "neutral-content": "#ffffff",
          "base-100": "#F7F3EA",
          "base-200": "#EFE8DB",
          "base-300": "#E5DBC7",
          "base-content": "#2F2F2F",
          "info": "#3ABFF8",
          "success": "#36B37E",
          "warning": "#F2A540",
          "error": "#E45858",
        },
      },

      {
        nileheritageDark: {
          "primary": "#C86A41",
          "primary-focus": "#A55733",
          "primary-content": "#ffffff",
          "secondary": "#1E4F56",
          "secondary-focus": "#184046",
          "secondary-content": "#ffffff",
          "accent": "#D5B77A",
          "accent-focus": "#C3A56C",
          "accent-content": "#1E1A12",
          "neutral": "#2F2F30",
          "neutral-content": "#EDEDED",
          "base-100": "#1A1A1A",
          "base-200": "#222222",
          "base-300": "#2A2A2A",
          "base-content": "#EDEDED",
          "info": "#3ABFF8",
          "success": "#36B37E",
          "warning": "#F2A540",
          "error": "#E45858",
        },
      },
    ],

    darkTheme: "nileheritageDark",
  },
};
