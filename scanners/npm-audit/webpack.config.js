module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  target: 'node',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: require('path').resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.([cm]?tsx?)$/,
        loader: "ts-loader",
      },
      {
        test: /assets\/.+/,
        type: 'asset/inline',
        generator: {
          dataUrl: content => Buffer.from(content.toString(), 'base64'),
        },
      },
    ]
  },
};
