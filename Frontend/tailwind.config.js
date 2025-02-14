// tailwind.config.js
export default {
  corePlugins: {
    backdropFilter: true, // ← Add this
  },
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [ require('daisyui'),],
  }