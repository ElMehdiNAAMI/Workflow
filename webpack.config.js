const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
  filename: "css/main.css"
});

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
