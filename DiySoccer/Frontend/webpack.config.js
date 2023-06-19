const path = require("path");
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./src/entry.js"],
  output: {
    path: path.resolve(__dirname, "../DiySoccer/content/dist/react"),
    filename: "react.app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test:/\.(s*)css$/,
        use: [
           miniCss.loader,
           'css-loader',
           'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new miniCss({
      filename: 'styles.bundle.css',
    }),
  ]
};