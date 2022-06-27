const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
    hot: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //export images to specific dir
    assetModuleFilename: 'images/[hash][ext][query]',
    //clean up dist/ before each build
    clean: true,
    //for 
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          //extract css into separate files
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Scss to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        },
      },
      {
        //resolve img src problem
        test: /\.html$/i,
        loader: "html-loader",
        options: {},
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(),
  //hot reload html
  new HtmlWebpackPlugin(
    {
      template: 'src/template.html',
      favicon: 'src/images/logo.svg'
    }
  ),
  ],
  // add this if have > 1 entry point 
  // optimization: {
  //   runtimeChunk: 'single',
  // },
};