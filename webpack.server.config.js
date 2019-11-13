const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );

const DashboardPlugin = require( 'webpack-dashboard/plugin' );


module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve( __dirname, 'dist' ),
    publicPath: 'http://localhost:3000/public/',
    filename: '[name].js'
  },
  target: 'node',
  node: {

    // Otherwise __dirname and __filename return blank or /?
    __dirname: false,
    __filename: false
  },
  externals: [ nodeExternals() ],
  mode: 'development',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {

        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new DashboardPlugin()
  ]
};
