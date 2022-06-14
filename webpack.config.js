const path = require("path");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    api: path.resolve(__dirname, "./src/api/api.js"),
    popup: path.resolve(__dirname, "./src/components/Popup.jsx"),
    verifyUser: path.resolve(__dirname, "./src/utils/verifyUser.js"),
    globalStyle: path.resolve(__dirname, "./src/shared/GlobalStyle.js"),
    errorMessage: path.resolve(__dirname, "./src/constants/errorMessage.js"),
    interactionMessage: path.resolve(__dirname, "./src/constants/interactionMessage.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.html$/,
        use: { loader: "html-loader" },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./manifest.json", to: "[name][ext]" },
        {
          from: "./public/assets/*.png",
          to: "assets/[name].png",
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "./public/popup.html",
      chunks: ["popup"],
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
  ],
};
