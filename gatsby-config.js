module.exports = {
  siteMetadata: {
    title: `pennlabs.org`,
    description: `Built for students, by students. Penn Labs is the student software development organization improving life at the University of Pennsylvania.`,
    author: `Penn Labs <contact@pennlabs.org>`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `pennlabs.org`,
        short_name: `pennlabs`,
        start_url: `/`,
        background_color: `#209CEE`,
        theme_color: `#209CEE`,
        display: `minimal-ui`,
        icon: `src/images/beaker-favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Inter, Work Sans'],
          urls: ['/fonts/fonts.css'],
        },
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://ghost.pennlabs.org`,
        contentApiKey: process.env.GHOST_API_KEY,
        version: `v3`, // Ghost API version, optional, defaults to "v3".
        // Pass in "v2" if your Ghost install is not on 3.0 yet!!!
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
