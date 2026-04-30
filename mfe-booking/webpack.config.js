const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  mode: isProduction ? "production" : "development",
  output: {
    publicPath: isProduction
      ? "https://js-palvelut-booking.vercel.app/"
      : "http://localhost:3003/",
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
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mfeBooking",
      filename: "remoteEntry.js",

      exposes: {
        // ✅ Shell imports: import("mfeBooking/BookingApp")
        "./BookingApp": "./src/App",
      },

      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),

    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],

  devServer: {
    port: 3003,
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};