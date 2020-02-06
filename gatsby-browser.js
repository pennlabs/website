/**
 * Implement Gatsby's Browser APIs in this file.
 */

exports.onClientEntry = () => {
  // https://github.com/gatsbyjs/gatsby/issues/4021
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    require('intersection-observer')
    console.log('IntersectionObserver is polyfilled')
  }
}
