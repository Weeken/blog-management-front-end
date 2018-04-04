const prod = require('./webpack.prod.config.js');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(prod, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});
