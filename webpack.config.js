const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );
const webpack = require( 'webpack' );
const ScriptExtPlugin = require( 'script-ext-html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const DefinePlugin = require( 'webpack/lib/DefinePlugin' );
const MomentLocalesPlugin = require( 'moment-locales-webpack-plugin' );
const Encore = require( '@symfony/webpack-encore' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
// const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const DashboardPlugin = require( 'webpack-dashboard/plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );


const buildPath = path.resolve( __dirname, 'public/build' );

const { root } = require( './config/helpers' );

const clientConfig = {

  // Stuff the entire webpack-front.config.js
  // without the require and module.exports lines

  entry: {
    client: root( './public/javascripts/index.js' )
  },
  output: {
    filename: '[name].js',
    path: buildPath
  },
  target: 'web',
  node: {
    fs: 'empty',
    console: true,
    net: 'empty',
    dns: 'empty'
  },
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  optimization: {
    minimizer: [ new TerserJSPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin({}) ]
  },
  devServer: {
    host: '0.0.0.0', // Required for docker
    publicPath: '/javascripts/',
    contentBase: path.resolve( __dirname, './' ),
    watchContentBase: true,
    compress: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new ScriptExtPlugin({
      defaultAttribute: 'defer'
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'public/assets', to: 'assets'
    //   },
    //   {
    //     from: 'public/stylesheets', to: 'stylesheets'
    //   }
    // ]),
    // Make $ and jQuery available in every module without having to write
    // require('jquery')
    new webpack.ProvidePlugin({
      $: root( './node_modules/jquery/dist/jquery.min' ),
      jQuery: root( './node_modules/jquery/dist/jquery.min' ),
      'window.jQuery': root( './node_modules/jquery/dist/jquery.min' )
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 'disabled'|'server'
      reportFilename: root( 'public/report.html' ),
      generateStatsFile: true,
      statsFilename: root( 'public/stats.json' )
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify( 'production' )
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};

module.exports = [ clientConfig ];
