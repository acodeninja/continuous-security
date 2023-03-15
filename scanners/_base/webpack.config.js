module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  target: 'node',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    path: require('path').resolve(process.cwd(), 'build'),
    library: {
      type: 'commonjs',
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.([cm]?tsx?)$/,
        loader: 'ts-loader',
      },
      {
        test: /assets\/.+/,
        type: 'asset/inline',
        generator: {
          dataUrl: content => content.toString(),
        },
      },
    ],
  },
};
