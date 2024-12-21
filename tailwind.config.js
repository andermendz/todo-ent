/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // main colors / colores principales
        primary: {
          light: '#4F46E5', 
          dark: '#3730A3',  
        },
        // background colors / colores de fondo
        background: {
          light: '#F1F5F9',
          dark: '#0F172A',
        },
        // surface colors / colores de superficie
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
    
        subtle: {
          light: '#F8FAFC',
          dark: '#1E293B',
        },
        // text colors / colores de texto
        text: {
          primary: {
            light: '#1E293B', // dark text for light mode / texto oscuro para modo claro
            dark: '#F1F5F9',  // light text for dark mode / texto claro para modo oscuro
          },
          secondary: {
            light: '#475569', // accessible gray / gris accesible
            dark: '#CBD5E1',
          }
        },
        // status colors / colores de estado
        status: {
          todo: {
            text: '#2563EB',
            bg: '#DBEAFE',
          },
          doing: {
            text: '#B45309',
            bg: '#FEF3C7',
          },
          done: {
            text: '#059669',
            bg: '#D1FAE5',
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in': 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale': 'scale 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      boxShadow: {
        'premium': '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(0, 0, 0, 0.05)',
        'premium-dark': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
