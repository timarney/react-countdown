var path = require('path')
var webpack = require('webpack')

var config = {
  devtool: 'eval',
  devServer: {
    inline: true,
    contentBase: './src',
    port: 3000
  },
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }, plugins: [ ]
}

if (process.env.NODE_ENV === 'production') {
  console.log('== production build ==')
  config.output.path = path.join(__dirname, 'dist/')

  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }))

  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true))
  config.plugins.push(new webpack.optimize.DedupePlugin())

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
      screw_ie8: true
    }
  }))
}

module.exports = config
