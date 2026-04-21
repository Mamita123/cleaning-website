const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    // ✅ Services MFE runs on port 3002
    publicPath: "http://localhost:3002/",
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
      name: "mfeServices",       // ✅ Must match shell's remote key
      filename: "remoteEntry.js",

      exposes: {
        // ✅ Shell imports this as: import("mfeServices/ServicesApp")
        "./ServicesApp": "./src/App",
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
    port: 3002,               // ✅ Services MFE always on port 3002
    historyApiFallback: true,
    hot: true,
    // ✅ Allow shell on port 3000 to fetch this MFE
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};