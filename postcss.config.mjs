// postcss.config.mjs
export default {
  plugins: {
    // This plugin is essential for Tailwind CSS v4's CSS-first approach.
    // It processes your CSS and generates the necessary Tailwind utilities.
    "@tailwindcss/postcss": {},
    // Autoprefixer is generally recommended for cross-browser compatibility
    "autoprefixer": {},
  },
};
