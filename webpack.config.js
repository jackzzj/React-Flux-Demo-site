var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/app.js' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'public/assets/build'),
    filename: 'bundle.js',
    publicPath: '/assets/build/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    }, {
      test: /bootstrap[\/\\]dist[\/\\]js[\/\\]/,
      loader: 'imports?jQuery=jquery'
    }, {
      test: /\.html$/,
      loader: "html"
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.txt$/,
      loader: 'raw-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: 'file-loader'
    }]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: "public",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  }
};
