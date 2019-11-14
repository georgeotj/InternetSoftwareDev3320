const DefinePlugin = require( 'webpack/lib/DefinePlugin' );

const { root } = require( './helpers' );

/**
 * This is a server config which should be merged on top of common config
 */
// eslint-disable-next-line func-names
module.exports = function( options ) {
  return {
    entry: root( './app.js' ),
    output: {
      filename: 'server.js'
    },
    target: 'node',
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
};
