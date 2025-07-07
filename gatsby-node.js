// Enable absolute imports from `src`.
// See https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/#absolute-imports
const path = require('path');

exports.onCreateWebpackConfig = ( { actions } ) => {
  actions.setWebpackConfig( {
    resolve: {
      modules: [ path.resolve( __dirname, `src` ), `node_modules` ],
    },
  })
}
