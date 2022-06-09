const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const jsConfig = {
  entry: {
    popup: "./src/popup.jsx",
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
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};

const pngConfig = {
  entry: Object.fromEntries(
    glob
      .sync(path.resolve(__dirname, "public/assets/*.png"))
      .map((v) => [v.split("public/assets/")[1], v])
  ),
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "[name].[ext]",
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  mode: "development",
};

module.exports = [jsConfig, pngConfig];
