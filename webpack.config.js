const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';
  return {
    // Emit an ES5-compatible runtime/wrapper so old WebKit (iPad 2 / iOS 9
    // Safari, Chrome 63) can parse the bundle. Without this, webpack's own
    // chunk-loading code uses arrow functions and shorthand methods.
    target: ['web', 'es5'],
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: './',
      filename: '[name].[contenthash].js',
      clean: true,
    },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          // Transpile our source AND dependencies that ship modern syntax
          // (lucide-react) so the bundle is parseable by old WebKit. Everything
          // else in node_modules (css-loader runtime, core-js, etc.) is left alone.
          exclude: {
            and: [
              /node_modules/,
              { not: [/[\\/]node_modules[\\/](lucide-react)[\\/]/] },
            ],
          },
          use: 'babel-loader',
        },
        {
          test: /\.module\.css$/,
          use: [
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: { modules: { namedExport: false, exportLocalsConvention: 'as-is' } },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(woff2?|png|jpe?g|svg)$/,
          type: 'asset',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      ...(prod ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })] : []),
      new CopyPlugin({ patterns: [{ from: 'public' }] }),
      ...(prod ? [new GenerateSW({ clientsClaim: true, skipWaiting: true })] : []),
    ],
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
  };
};
