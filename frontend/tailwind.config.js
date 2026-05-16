module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      colors: {
        primary: "#0F172A",
        "primary-hover": "#1E293B",
        accent: "#0369A1",
        "accent-hover": "#0284C7",
        whatsapp: "#25D366",
        "whatsapp-hover": "#20BD5A",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
