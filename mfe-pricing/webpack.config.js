const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    // ✅ Pricing MFE runs on port 3005
    publicPath: "http://localhost:3005/",
  },

  resolve: {
    extensions: [".jsx", ".js"],
  },

  module: {
    rules: [
      {
        // ✅ Process JS and JSX with Babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        // ✅ Process CSS with PostCSS for Tailwind
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mfePricing",       // ✅ Must match shell remote key
      filename: "remoteEntry.js",

      exposes: {
        // ✅ Shell imports: import("mfePricing/PricingApp")
        "./PricingApp": "./src/App",
      },

      shared: {
        // ✅ Shares React with shell — no duplicate loading
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),

    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],

  devServer: {
    port: 3005,               // ✅ Pricing MFE always on port 3005
    historyApiFallback: true,
    hot: true,
    // ✅ Allow shell on port 3000 to load this MFE
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};