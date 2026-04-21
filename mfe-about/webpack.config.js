const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    // ✅ About MFE runs on port 3004
    publicPath: "http://localhost:3004/",
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
      name: "mfeAbout",        // ✅ Must match shell remote key
      filename: "remoteEntry.js",

      exposes: {
        // ✅ Shell imports: import("mfeAbout/AboutApp")
        "./AboutApp": "./src/App",
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
    port: 3004,               // ✅ About MFE always on port 3004
    historyApiFallback: true,
    hot: true,
    // ✅ Allow shell on port 3000 to load this MFE
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};