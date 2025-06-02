/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        
        primary: {
          DEFAULT: "#2563eb", 
          light: "#3b82f6",   
          dark: "#1d4ed8",    
        },
        secondary: {
          DEFAULT: "#f59e0b", 
          light: "#fbbf24",   
          dark: "#d97706",    
        },

        
        background: {
          DEFAULT: "#fafafa",
          light: "#ffffff",
          dark: "#1f2937", 
        },
        text: {
          DEFAULT: "#111827", 
          secondary: "#374151", 
          muted: "#6b7280", 
          inverted: "#ffffff",
        },

        
        success: "#10b981",   
        warning: "#f97316",   
        error: "#ef4444",     
        info: "#0ea5e9",      
      },
    },
  },
  plugins: [],
}