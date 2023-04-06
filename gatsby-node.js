/**
 * Implement Gatsby's Node APIs in this file.
 *
 * NOTE these files which Gatsby builds on directly do not have TypeScript
 * support (hence the use of vanilla JS)
 */

const fetch = require('node-fetch')
const path = require(`path`)
const crypto = require('crypto')
const remark = require('remark')
const html = require('remark-html')
const { paginate } = require('gatsby-awesome-pagination')

const { postsPerPage } = require('./src/constants/blog.ts')
const AlumniTemplate = path.resolve(`./src/templates/Alumni.tsx`)
const MemberTemplate = path.resolve(`./src/templates/Member.tsx`)
const ProductTemplate = path.resolve(`src/templates/Product.tsx`)
const TagTemplate = path.resolve(`./src/templates/Tag.tsx`)
const BlogPostTemplate = path.resolve(`./src/templates/BlogPost.tsx`)
const BlogIndexTemplate = path.resolve(`./src/templates/BlogIndex.tsx`)

const markdownProcessor = remark().use(html)

const getHash = jawn =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(jawn))
    .digest(`hex`)

const createTagPages = (tags, createPage) => {
  tags.forEach(({ node }) => {
    const totalPosts = node.postCount || 0

    // This part here defines, that our tag pages will use
    // a `/tag/:slug/` permalink.
    node.url = `/blog/tag/${node.slug}/`

    // paginate
    paginate({
      createPage,
      items: Array.from({ length: totalPosts }),
      itemsPerPage: postsPerPage,
      component: TagTemplate,
      pathPrefix: ({ pageNumber }) => {
        if (pageNumber === 0) {
          return `/blog/tag/${node.slug}`
        } else {
          return `/blog/tag/${node.slug}/page`
        }
      },
      context: {
        slug: node.slug,
      },
    })
  })
}

const createPostPages = (posts, createPage) => {
  posts.forEach(({ frontmatter: { slug } }) => {
    // This part here defines, that our posts will use
    // a `/:slug/` permalink.
    const url = `blog/${slug}/`

    createPage({
      path: url,
      component: BlogPostTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: slug,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type MembersJson implements Node {
    team: String
    posts: [MarkdownRemark] @link(by: "frontmatter.authors.pennkey", from: "pennkey")
  }
  type TeamsJson implements Node {
    name: String
    members: [MembersJson] @link(by: "team", from: "name")
  }

  type MarkdownRemark implements Node {
    frontmatter: Frontmatter
  }
  type Frontmatter {
    authors: [MembersJson] @link(by: "pennkey")
    customExcerpt: String
    publishedAt: Date @dateformat(formatString: "YYYY-MM-DD")
    draft: Boolean
  }`

  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  /**
   * Create pages for members
   */

  // Retrieve ID's of all team members
  const {
    data: {
      allMembersJson: { edges },
    },
  } = await graphql(`
    query {
      allMembersJson {
        edges {
          node {
            id
            pennkey
          }
        }
      }
    }
  `)
  await edges.map(({ node: { id, pennkey } }) =>
    createPage({
      path: `/team/${pennkey}`,
      component: MemberTemplate,
      context: {
        // Data passed to context is available in page queries as GraphQL vars
        id,
        pennkey,
      },
    }),
  )

   // Retrieve ID's of all team members
  const {
    data: {
      allAlumniJson: { edges:alumni },
    },
  } = await graphql(`
    query {
      allAlumniJson {
        edges {
          node {
            id
            pennkey
          }
        }
      }
    }
  `)
  await alumni.map(({ node: { id, pennkey } }) =>
    createPage({
      path: `/alumni/${pennkey}`,
      component: AlumniTemplate,
      context: {
        // Data passed to context is available in page queries as GraphQL vars
        id,
        pennkey,
      },
    }),
  )

  /**
   * Create pages for products
   */
  const {
    errors: mdErrors,
    data: {
      allMarkdownRemark: { edges: products },
    },
  } = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/products/" } }
        sort: { order: DESC, fields: [frontmatter___title] }
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `)

  if (mdErrors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  products.forEach(({ node }) => {
    const { fileAbsolutePath } = node

    // Example: /Users/JawnSmith/projects/pennlabs.org/src/markdown/products/penn-mobile.md
    // -> 'products/penn-mobile
    if (fileAbsolutePath.indexOf('/markdown') === -1) {
      return
    }
    const productPagePath = fileAbsolutePath
      .split('/markdown')[1]
      .split('.md')[0]

    createPage({
      path: productPagePath,
      component: ProductTemplate,
      context: { fileAbsolutePath }, // additional data can be passed via context
    })
  })

  const {
    errors: ghostErrors,
    data: {
      allMarkdownRemark: { nodes: posts },
    },
  } = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          frontmatter: { draft: { ne: false } }
        }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (ghostErrors) {
    throw new Error(ghostErrors)
  }

  createPostPages(posts, createPage)

  // Create pagination for the index page.
  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: BlogIndexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/blog`
      } else {
        return `/blog/page`
      }
    },
  })
}
