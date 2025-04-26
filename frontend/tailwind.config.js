/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundColor: {
        main: '#0D0D1A',
        navbar: '#121E30',
        backdrop: '#1B2436',
      },
      textColor: {
        main: "#FDFDFD"
      }
    },
  },
  plugins: [],
};
