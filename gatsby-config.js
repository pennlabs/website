module.exports = {
  siteMetadata: {
    title: `pennlabs.org`,
    description: `Built for students, by students. Penn Labs is the student software development organization improving life at the University of Pennsylvania.`,
    author: `Penn Labs <contact@pennlabs.org>`,
    siteUrl: `https://pennlabs.org/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-meta-redirect`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-21029575-11',
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Member',
        imagePath: 'photo',
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Alumni',
        imagePath: 'photo',
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'GhostPost',
        imagePath: 'feature_image',
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/json/`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'MembersJson',
        imagePath: 'photo',
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'AlumniJson',
        imagePath: 'photo',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description:
                    edge.node.frontmatter.customExcerpt || edge.node.excerpt,
                  date: edge.node.frontmatter.publishedAt,
                  url:
                    site.siteMetadata.siteUrl +
                    'blog/' +
                    edge.node.frontmatter.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    'blog/' +
                    edge.node.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {
                    fileAbsolutePath: { regex: "/blog/" }
                    frontmatter: { draft: { ne: false } }
                  }
                  sort: { order: DESC, fields: [frontmatter___publishedAt] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        publishedAt
                        slug
                        customExcerpt
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Penn Labs RSS Feed',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
          },
        ],
      },
    },
  ],
}
