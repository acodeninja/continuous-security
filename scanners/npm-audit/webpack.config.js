module.exports = {
  mode: 'production',
  entry: './src/main.js',
  target: 'node',
  output: {
    filename: 'main.js',
    path: require('path').resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
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
