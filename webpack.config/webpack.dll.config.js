const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    //这地方写你想抽离的包，可以参考你的package.json文件下的dependencies
    vue: ['vue', 'vue-router']
  },
  output: {
    //这地方写你打包后生成文件的路径
    path: path.join(__dirname,"../src/dll"),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins:[
    //这个插件是重点，用于打包上面entry里配置的包
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname,"../src/dll",'[name]-manifest.json'),
      name: '[name]',
    })
  ]
}
