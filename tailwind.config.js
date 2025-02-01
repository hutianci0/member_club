/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs"],
  theme: {
    container: {
      center: true
    },
    extend: {},
  },
  plugins: [{
    tailwindcss: {},
    autoprefixer: {}
  }],
}

