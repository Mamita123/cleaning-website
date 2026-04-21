// ✅ Converts modern JS and JSX into browser-compatible code
module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};