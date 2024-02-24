/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "0rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        azul: "#093981",
        blanco: "#FFFFFF",
        "border-gray": "#BABFC7",
        "placeholder-input": "#17363847",
        "bg-search": "#AAC0D435",
        "icon-bg": "#052452",
        "blue-border": "#074A87",
        "red-text": "#EF2424",
        "border-white": "#E0D6D6",
        negro: "#110408",
        amarillo: "#BCAE49",
        "admin-gray": "#13131360",
        "admin-black": "#000000",
        "admin-blue": "#0B63F8",
        "verde-whatsapp": "#25D366",
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        "prosto-one": ['"Prosto One"', "sans-serif"],
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};
