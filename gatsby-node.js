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
const MemberTemplate = path.resolve(`./src/templates/Member.tsx`)
const ProductTemplate = path.resolve(`src/templates/Product.tsx`)
const TagTemplate = path.resolve(`./src/templates/Tag.tsx`)
const BlogPostTemplate = path.resolve(`./src/templates/BlogPost.tsx`)
const BlogIndexTemplate = path.resolve(`./src/templates/BlogIndex.tsx`)

// Ensure that env is set correctly
const { GHOST_API_KEY } = process.env
if (!GHOST_API_KEY) {
  throw new Error('Missing GHOST_API_KEY in env')
}

const markdownProcessor = remark().use(html)

const GhostAuthorType = `GhostAuthor`

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
  posts.forEach(({ node: { slug, authors } }) => {
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
        authors: authors.map(({ slug }) => slug),
      },
    })
  })
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
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___title] }) {
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
      allGhostTag: { edges: tags },
      allGhostPost: { edges: posts },
    },
  } = await graphql(`
    query {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            authors {
              slug
            }
          }
        }
      }
      allGhostTag(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
    }
  `)

  if (ghostErrors) {
    throw new Error(ghostErrors)
  }

  createTagPages(tags, createPage)
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
