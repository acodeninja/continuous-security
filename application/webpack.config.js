const {BannerPlugin} = require('webpack');
const {chmod} = require('fs/promises');
const {resolve} = require('path');

module.exports = [{
  mode: 'production',
  entry: './src/Cli.ts',
  target: 'node',
  devtool: 'inline-source-map',
  output: {
    filename: 'continuous-security',
    path: resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
    function () {
      this.hooks.done.tapPromise('Make executable', async function () {
        await chmod(resolve(__dirname, 'build', 'continuous-security'), 0o777);
      });
    },
  ],
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: {
          loader: 'ts-loader',
          options: {
            allowTsInNodeModules: true
          }
        },
      },
      {
        test: /\.node$/,
        type: 'asset/inline',
        generator: {
          dataUrl: content => Buffer.from(content.toString(), 'base64'),
        },
      },
      {
        test: /(assets\/.+|\.md)/,
        type: 'asset/inline',
        generator: {
          dataUrl: content => content.toString(),
        },
      },
    ]
  },
}];
