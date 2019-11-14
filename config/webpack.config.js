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
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

const buildPath = path.resolve( __dirname, './build' );


const { root } = require( './helpers' );

Encore
  // directory where compiled assets are stored
  .setOutputPath( 'public/build/front' )
  // public path used by web server to access the output path
  .setPublicPath( '/build/' )
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .addEntry( 'index', './public/javascripts/index.js' )
  .autoProvidejQuery()

  // css entry
  .addStyleEntry( 'css/app', [
    './public/stylesheets/style.css'
  ])

  // allows legacy applications to use $/jQuery as a global variable
  // .autoProvidejQuery()
  .enableSourceMaps( !Encore.isProduction() )
  .enableSourceMaps( true )
  .enableVersioning( Encore.isProduction() )
  // Add ejs loader and plugin depends
  .addLoader({
      test: /\.ejs$/, loader: 'ejs-render-loader'
  })

  .addPlugin( new webpack.ProvidePlugin({
    // lodash
    _: 'lodash'
  }) )

  .addPlugin( new HtmlWebpackPlugin({
    template: path.join( __dirname, './views/index.ejs' ),
    filename: '../index.html'
  }) )
  .addPlugin( new CopyWebpackPlugin([
    {
      from: './public', to: 'public'
    }
  ]) )
  .addPlugin( new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  }) );

const clientConfig = {

  // Stuff the entire webpack-front.config.js
  // without the require and module.exports lines

  entry: {
    app: root( './public/javascripts/index.js' )
  },
  output: {
    filename: '[name].js',
    path: buildPath,
    publicPath: '/'
  },
  target: 'web',
  node: {
    fs: 'empty',
    console: true
  },
  devServer: {
    host: '0.0.0.0', // Required for docker
    publicPath: '/javascripts/',
    contentBase: path.resolve( __dirname, './' ),
    watchContentBase: true,
    compress: true,
    port: 3000
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([ 'build/css', 'build/js', 'html', 'views/partials/links' ], {}),
    new HtmlWebpackPlugin({
      template: root( './views/index.ejs' ),
      output: root( 'build' ),
      inject: 'body',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: '!!ejs-webpack-loader!views/layouts/checkout.ejs',
      filename: root( '/html/checkout.html' )
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: '!!ejs-webpack-loader!views/layouts/shipping-information.ejs',
      filename: root( '/html/shipping-information.html' )
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: '!!ejs-webpack-loader!views/layouts/shopping-cart.ejs',
      filename: root( '/html/shopping-cart.html' )
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: '!!ejs-webpack-loader!views/layouts/user-information.ejs',
      filename: root( '/html/user-information.html' )
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: '!!ejs-webpack-loader!views/index.ejs',
      filename: root( '/html/index.html' )
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: '!!ejs-webpack-loader!views/partials/header.ejs',
      filename: root( '/html/header.html' )
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: '!!ejs-webpack-loader!views/partials/footer.ejs',
      filename: root( '/html/footer.html' )
    }),
    new ScriptExtPlugin({
      defaultAttribute: 'defer'
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/assets', to: 'assets'
      },
      {
        from: 'public/stylesheets', to: 'stylesheets'
      }
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 'disabled'|'server'
      reportFilename: root( 'build/report.html' ),
      generateStatsFile: true,
      statsFilename: root( 'build/stats.json' )
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3030
    })
  ]
};

const serverConfig = {

  // Stuff the entire webpack-back.config.js
  // without the require and module.exports lines

  entry: root( './app.js' ),
  output: {
    filename: '[name]-bundle.js',
    path: buildPath
  },
  externals: [ nodeExternals() ],
  target: 'node',
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
  plugins: [

    new DefinePlugin({
      window: undefined,
      document: undefined,
      location: JSON.stringify({
        protocol: 'http', // `http` or `https`
        host: 'localhost'
      })
    })
  ]
};

// Combined 'module.exports'
module.exports = [ clientConfig ];
