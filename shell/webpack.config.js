const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3000/",
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },

      {
  // ✅ Handle SVG and image files
  test: /\.(svg|png|jpg|jpeg|gif)$/i,
  type: "asset/resource",
},
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        // We will add MFEs here one by one as we build them
        mfeHome:     "mfeHome@http://localhost:3001/remoteEntry.js",
        mfeServices: "mfeServices@http://localhost:3002/remoteEntry.js",
        mfeBooking:  "mfeBooking@http://localhost:3003/remoteEntry.js",
        mfeAbout:    "mfeAbout@http://localhost:3004/remoteEntry.js",
        mfePricing:  "mfePricing@http://localhost:3005/remoteEntry.js",
        mfeReviews:  "mfeReviews@http://localhost:3006/remoteEntry.js",
        mfeContact:  "mfeContact@http://localhost:3007/remoteEntry.js",
        mfeAdmin:    "mfeAdmin@http://localhost:3008/remoteEntry.js",
      },
      shared: {
  // ✅ Updated to match React 19 which is what you have installed
  react: { 
    singleton: true, 
    requiredVersion: "^19.0.0"  // changed from ^18.0.0
  },
  "react-dom": { 
    singleton: true, 
    requiredVersion: "^19.0.0"  // changed from ^18.0.0
  },
  "react-router-dom": { singleton: true },
},
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};