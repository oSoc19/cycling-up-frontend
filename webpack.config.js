module.exports = {
  entry: `./src/js/script.js`,
  output: {
    path: require('path').resolve(`./src`),
    filename: `script.js`
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: `babel-loader`
      }
    ]
  }
};
