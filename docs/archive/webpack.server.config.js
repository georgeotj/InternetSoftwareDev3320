const path = require( 'path' );
const nodeExternals = require( 'webpack-node-externals' );

const TerserJSPlugin = require( 'terser-webpack-plugin' );

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );

const HtmlWebPackPlugin = require( 'html-webpack-plugin' );


const DashboardPlugin = require( 'webpack-dashboard/plugin' );

function customHtmlWebpackPlugin( specificOptions ) {
  const defaults = {

    // hashes the file to prevent bad caching
    hash: true,

    // exclude worthless JS files
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true
    },

    // Tell plugin to inject any javascript into bottom of body
    inject: 'body'
  };

  // cool ES6 spread operator
  // add the default options with custom object passed as parameter
  return new HtmlWebPackPlugin({
    ...defaults, ...specificOptions
  });
}

const webpack = require( 'webpack' );

  module.exports = {
    entry: { index: [ './src/index' ] },
    mode: 'development',
    output: {
      path: path.resolve( __dirname, '../dist' ),
      filename: '[name]-bundle.js',
      publicPath: '/'
    },
    devServer: {
      contentBase: 'dist',
      overlay: true,
      hot: true,
      stats: { colors: true }
    },
    optimization: {
      minimizer: [ new TerserJSPlugin({ sourceMap: true }),
        new OptimizeCSSAssetsPlugin({}) ]
    },

    // target: 'node',
    // node: {
    //
    //   // Otherwise __dirname and __filename return blank or /?
    //   __dirname: false,
    //   __filename: false
    // },
    externals: [ nodeExternals(),
      /(node_modules|main\..*\.js)/
    ],
    module: {
      rules: [
        {

          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [

            // style-loader injects css into html
            { loader: 'style-loader' },

            // Loaders run in reverse order, css-loader runs first
            { loader: 'css-loader' } ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loaders: [ 'style-loader', 'css-loader' ]

            // // style-loader injects css into html
            // { loader: 'style-loader' },
            //
            // // Loaders run in reverse order, css-loader runs first
            // { loader: 'css-loader' } ]
        },
        {
          test: /\.scss$/,
          use: [ { loader: 'style-loader' }, {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          } ]
        },

        {

          // Loads the javacript into html template provided.
          // Entry point is set below in HtmlWebPackPlugin in Plugins
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'

              // options: { minimize: true }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [ 'file-loader' ]
        }
      ]
    },
    plugins: [

      // Webpack links the entry point and the template
      customHtmlWebpackPlugin({

        // The HTML file to be CREATED
        filename: './dist/index.html',

        // use ejs-compiled-loader to compile EJS to HTML, then use that as the template
        template: '!!ejs-loader!./views/index.ejs',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      }),
      new webpack.HotModuleReplacementPlugin(),

      new FriendlyErrorsWebpackPlugin(),
      new CleanWebpackPlugin(),
      new DashboardPlugin()
    ]
  };
