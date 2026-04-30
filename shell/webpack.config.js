const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js",
  output: {
    publicPath: isProduction
      ? "https://js-palvelut-shell.vercel.app/"
      : "http://localhost:3000/",
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
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: isProduction ? {
        // ✅ Production — Vercel URLs
        mfeHome:     "mfeHome@https://js-palvelut-home.vercel.app/remoteEntry.js",
        mfeServices: "mfeServices@https://js-palvelut-services.vercel.app/remoteEntry.js",
        mfeBooking:  "mfeBooking@https://js-palvelut-booking.vercel.app/remoteEntry.js",
        mfeAbout:    "mfeAbout@https://js-palvelut-about.vercel.app/remoteEntry.js",
        mfePricing:  "mfePricing@https://js-palvelut-pricing.vercel.app/remoteEntry.js",
        mfeReviews:  "mfeReviews@https://js-palvelut-reviews.vercel.app/remoteEntry.js",
        mfeContact:  "mfeContact@https://js-palvelut-contact.vercel.app/remoteEntry.js",
        mfeAdmin:    "mfeAdmin@https://js-palvelut-admin.vercel.app/remoteEntry.js",
      } : {
        // ✅ Development — localhost URLs
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
        react: {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-router-dom": {
          singleton: true,
        },
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