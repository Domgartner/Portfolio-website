const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Handle images
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Output file naming convention
              outputPath: 'images',        // Images output directory
            },
          },
        ],
      },
      {
        test: /\.(glsl|vs|fs)$/, // Handle GLSL files
        use: [
          'raw-loader',             // First load as raw string
          {
            loader: 'glslify-loader', // Then apply glslify
          },
        ],
      },
      {
        test: /\.pdf$/, // Handle PDF files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Output file naming convention
              outputPath: 'files',        // Files output directory
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
};
