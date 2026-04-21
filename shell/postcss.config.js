// ✅ Tailwind v4 uses @tailwindcss/postcss instead of tailwindcss directly
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},  // ✅ New v4 way
    autoprefixer: {},
  },
};