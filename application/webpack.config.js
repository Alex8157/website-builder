const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require("path");

module.exports = {
    entry:"./app/renderer/renderer.js",
    target: 'electron-main',
    output:{
        path: path.resolve(__dirname, './app/dist'),
        filename:'renderer.js',
        publicPath:'app/dist/'
    },
    resolve: {
      alias: {
        '@': path.resolve( __dirname, 'app', 'renderer' ),
        '@images': path.resolve( __dirname, 'app', 'renderer', 'images' ),
      },
    },
    module: {
      rules: [
        {
          test: /\.svg$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    devtool:'eval-sourcemap'
}