const webpack = require( 'webpack' );

const { root } = require( './helpers' );

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = function( options ) {
  return {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false // we need this for lazy v8
        },
        sourceMap: false
      })
    ]
  };
};
