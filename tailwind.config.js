/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // The existing design lives in app/globals.css, so Tailwind's reset is off
  // to keep every page looking exactly as before. Utilities are still available.
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};
