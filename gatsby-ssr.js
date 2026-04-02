/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="pennlabs-status-banner"
      src="https://status.pennlabs.org/banner.js"
      defer
    />,
  ])
}
