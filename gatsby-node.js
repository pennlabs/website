/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require('node-fetch')
const path = require(`path`)
const crypto = require('crypto')
const remark = require('remark')
const html = require('remark-html')

const MemberTemplate = path.resolve(`./src/templates/Member.tsx`)
const ProductTemplate = path.resolve(`src/templates/Product.tsx`)

const markdownProcessor = remark().use(html)

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
    id: url,
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

// exports.onCreateNode = ({ actions, node }) => {
//   const { type } = node.internal
//   if (type !== `Member`) return
//   const { bio } = node
//   const bioAsHtml = markdownProcessor.process(bio)
//   node.bio = bioAsHtml
// }

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
          }
        }
      }
    }
  `)
  const ids = edges.map(({ node: { id } }) => id)
  await ids.map(id =>
    createPage({
      path: `/team/${id}`,
      component: MemberTemplate,
      context: {
        // Data passed to context is available in page queries as GraphQL vars
        id: id,
      },
    }),
  )

  /**
   * Create pages for products
   */
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___title] }) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `)

  const { errors, data } = result

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const {
    allMarkdownRemark: { edges: products },
  } = data
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
}
