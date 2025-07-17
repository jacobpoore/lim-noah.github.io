/** @type {import('tailwindcss').Config} */
const config = require("shadcn/ui/tailwind.config")

module.exports = {
  ...config,
  content: [
    ...config.content,
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    "./public/**/*.html",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      colors: {
        ...config.theme.extend.colors,
        // Ocean Blues
        "ocean-deep": "#001F3F", // Dark blue for deep ocean / dark mode background
        "ocean-mid": "#004080", // Medium blue for shadows / dark mode elements
        "ocean-light": "#007BFF", // Brighter blue for primary elements / light mode accents
        "sky-blue": "#ADD8E6", // Light blue for sky / light mode backgrounds
        "wave-blue": "#6495ED", // Cornflower blue for waves / secondary elements

        // Tropical Greens & Teals
        seafoam: "#7FFFD4", // Light teal for highlights
        lagoon: "#20B2AA", // Medium teal for accents
        "coral-green": "#3CB371", // Medium green for tropical plants / secondary accents

        // Sandy & Coral Accents
        "sandy-beach": "#F4A460", // Sandy brown for warm accents
        "sunset-coral": "#FF6347", // Tomato red for vibrant accents (sparingly)
        "shell-white": "#F5F5DC", // Beige for light backgrounds / text in dark mode
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...config.plugins, require("tailwindcss-animate")],
}