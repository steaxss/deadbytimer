/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./overlay.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ui: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        mono: ['ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','Liberation Mono','monospace']
      }
    }
  },
  plugins: []
};
