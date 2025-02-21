/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'main-color':'#0aad0a',
        'light-color':'#f0f3f2',
        'shadow':'rgba(145,158,171,.2) 0px 2px 4px -1px,rgba(145,158,171,.14) 0px 4px 5px 0px,rgba(145,158,171,.12) 0px 1px 10px 0px',
        'rating-color':'#ffc908'
      },
      boxShadow:{
        'all-shadow':'0px 0px 10px 2px rgba(0, 150, 0, 0.3)'
      }
    },
  },
  plugins: [
    "flowbite/plugin"
  ],
}


