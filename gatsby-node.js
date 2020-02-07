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

const getTeamNode = team => {
  const { name, description } = team
  return {
    // Required fields
    id: name,
    parent: `__SOURCE__`,
    internal: {
      type: `Team`, // name of the graphQL query --> allRandomUser {}
      // contentDigest will be added just after but it is required
    },
    children: [],

    // Other fields that you want to query with GraphQL
    description,
    name,
  }
}

const getMemberNode = async member => {
  const { url, bio, ...rest } = member
  const { contents: bioAsHtml } = await markdownProcessor.process(bio || '')
  return {
    id: `Labs__Member__${url}`,
    internal: {
      type: `Member`,
    },
    children: [],
    url,
    bio: bioAsHtml,
    ...rest,
  }
}

const createTeamAndMemberNodes = async ({ actions }) => {
  /**
   * Create a mapping from the Penn Labs API for teams to the Gatsby data store.
   * Effetively, make an Object for each Team and for each Member. Each Team has
   * many Members and each Member has one Team (many-to-one relationship.)
   *
   * After completing this, we can source the data into our components via
   * GraphQL, which is nice, though the code below is not particularly nice.
   */

  // Set of actions given to use from Gatsby
  const { createNode } = actions

  const createNodeWrapper = jawn => {
    // Get content digest of node and add it to the node
    const digest = getHash(jawn)
    jawn.internal.contentDigest = digest

    // Register node in Gatsby
    return createNode(jawn)
  }

  // fetch raw data from the randomuser api
  const teams = await fetch(
    `https://platform.pennlabs.org/org/teams/?format=json`,
  ).then(res => res.json())

  await Promise.all(
    teams.map(async team => {
      const { members } = team
      const memberNodes = await Promise.all(
        members.map(member => getMemberNode(member)),
      )

      await Promise.all(memberNodes.map(member => createNodeWrapper(member)))

      // Create node with the gatsby createNode() API
      const teamNode = getTeamNode(team)
      teamNode.children = memberNodes.map(({ id }) => id)
      return createNodeWrapper(teamNode)
    }),
  )

  return
}

exports.sourceNodes = async ({ actions }) => {
  /**
   * Create a mapping from the Penn Labs API for teams to the Gatsby data store.
   * Effetively, make an Object for each Team and for each Member. Each Team has
   * many Members and each Member has one Team (many-to-one relationship.)
   *
   * After completing this, we can source the data into our components via
   * GraphQL, which is nice, though the code below is not particularly nice.
   */

  await createTeamAndMemberNodes({ actions })
  return
}

exports.onCreateNode = ({ node, actions }) => {
  const { type } = node.internal
  const { createNodeField } = actions
  if (type === GhostAuthorType) {
    if (node.slug !== 'data-schema-author') {
      // create a foreign key relationship between an author in Ghost and a
      // Labs member.
      // Original inspiration: https://github.com/gatsbyjs/gatsby/issues/1583#issuecomment-317827660
      // Now has documentation: https://www.gatsbyjs.org/docs/node-creation/#foreign-key-reference-___node
      createNodeField({
        node,
        name: `member___NODE`,
        value: `Labs__Member__${node.slug}`,
      })
    }
  }
}

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
      allMember: { edges },
    },
  } = await graphql(`
    query {
      allMember {
        edges {
          node {
            id
            url
          }
        }
      }
    }
  `)
  await edges.map(({ node: { id, url } }) =>
    createPage({
      path: `/team/${url}`,
      component: MemberTemplate,
      context: {
        // Data passed to context is available in page queries as GraphQL vars
        id,
        url,
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
