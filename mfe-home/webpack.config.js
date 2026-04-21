const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",

  // ✅ Entry point for this MFE
  entry: "./src/index.js",

  output: {
    // ✅ Must match this MFE's port (3001)
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    // ✅ Allow importing .jsx and .js without writing the extension
    extensions: [".jsx", ".js"],
  },

  module: {
    rules: [
      {
        // ✅ Process all JS and JSX files with Babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        // ✅ Process CSS with PostCSS (needed for Tailwind)
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mfeHome", // ✅ Must match shell's remote key

      // ✅ This file is what the shell loads at runtime
      filename: "remoteEntry.js",

      exposes: {
        // ✅ Shell imports this as: import("mfeHome/HomeApp")
        "./HomeApp": "./src/App",
      },

      shared: {
        // ✅ singleton: true — shares React with shell, no duplicate
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    port: 3001,               // ✅ Home MFE always runs on port 3001
    historyApiFallback: true,
    hot: true,
    // ✅ Allow shell on port 3000 to load this MFE
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};