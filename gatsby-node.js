/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require('node-fetch')
const crypto = require('crypto')

const getHash = jawn =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(jawn))
    .digest(`hex`)

exports.sourceNodes = async ({ actions }) => {
  /**
   * Create a mapping from the Penn Labs API for teams to the Gatsby data store.
   * Effetively, make an Object for each Team and for each Member. Each Team has
   * many Members and each Member has one Team (many-to-one relationship.)
   *
   * After completing this, we can source the data into our components via
   * GraphQL, which is nice, though the code below is not particularly nice.
   */

  // Set of actions given to use from Gatsby
  const { createNode, createParentChildLink } = actions

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

  teams.map(async (team, i) => {
    const { name, description, members } = team
    // Create your node object
    const teamNode = {
      // Required fields
      id: `${i}`,
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

    const memberNodes = members.map((member, memberIdx) => {
      const { url } = member
      const memberNode = {
        id: url,
        internal: {
          type: `Member`,
        },
        children: [],
        ...member,
      }

      return memberNode
    })

    await Promise.all(memberNodes.map(member => createNodeWrapper(member)))

    // Create node with the gatsby createNode() API
    await createNodeWrapper(teamNode)

    await memberNodes.map(memberNode =>
      createParentChildLink({ parent: teamNode, child: memberNode }),
    )
  })

  return
}
