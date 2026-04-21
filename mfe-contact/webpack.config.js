const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    // ✅ Contact MFE runs on port 3007
    publicPath: "http://localhost:3007/",
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
      name: "mfeContact",
      filename: "remoteEntry.js",

      exposes: {
        // ✅ Shell imports: import("mfeContact/ContactApp")
        "./ContactApp": "./src/App",
      },

      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),

    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],

  devServer: {
    port: 3007,
    historyApiFallback: true,
    hot: true,
    // ✅ Allow shell to load this MFE
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};