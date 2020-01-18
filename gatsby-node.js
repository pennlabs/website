/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require('node-fetch')
const path = require(`path`)
const crypto = require('crypto')

const MemberTemplate = path.resolve(`./src/templates/Member.tsx`)

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

const getMemberNode = member => {
  const { url } = member
  return {
    id: url,
    internal: {
      type: `Member`,
    },
    children: [],
    ...member,
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
      const memberNodes = members.map(member => getMemberNode(member))

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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

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
}
