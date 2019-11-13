const path = require( 'path' );
const webpack = require( 'webpack' );

const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const TerserJSPlugin = require( 'terser-webpack-plugin' );

const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

const DashboardPlugin = require( 'webpack-dashboard/plugin' );

const LiveReloadPlugin = require( 'webpack-livereload-plugin' );

const buildPath = path.resolve( __dirname, './public' );

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


module.exports = {
  entry: './public/javascripts/index',
  optimization: {
    minimizer: [ new TerserJSPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin({}) ]
  },

  // {
    // loadProducts: './public/load-products.js',
    // loadStates: './public/load-states.js',
    // navigationButtons: './public/navigation-buttons.js',
    // saveOrderInformation: './public/save-order-information.js',
    // savePaymentInformation: './public/save-payment-information.js',
    // saveShippingInformation: './public/save-shipping-information.js',
    // saveUserInformation: './public/save-user-information.js',
    // shoppingCart: './public/shopping-cart.js',
    // validateAccount: './public/validate-account-form.js',
    // validateCheckout: './public/validate-checkout-form.js',
    // validateShipping: './public/validate-shipping-form.js'
  // },
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: 'http://localhost:3000/public/'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // {
      //   test: /\.ejs$/,
      //   use: [
      //     { loader: 'ejs-loader' } ]
      // },
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
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
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
      template: '!!ejs-loader!./views/index.ejs'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      // eslint-disable-next-line global-require
      cssProcessor: require( 'cssnano' ),
      cssProcessorOptions: { preset: [ 'default', { discardComments: { removeAll: true } } ] },
      canPrint: true
    }),
    new DashboardPlugin(),
    new LiveReloadPlugin()
  ]
};
