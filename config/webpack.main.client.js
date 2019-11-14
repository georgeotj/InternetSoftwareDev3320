const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const ScriptExtPlugin = require( 'script-ext-html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const { root } = require( './helpers' );


/**
 * This is a client config which should be merged on top of common config
 */
module.exports = function( options ) {
  return {
 entry: {
 app: root( './public/javascripts/index.js' )
    },
    output: {
 filename: '[name].js'
},
    target: 'web',
    plugins: [
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
      ])
    ]
  };
};
