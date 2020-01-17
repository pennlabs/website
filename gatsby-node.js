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
  const { createNode } = actions

  // fetch raw data from the randomuser api
  const teams = await fetch(
    `https://platform.pennlabs.org/org/teams/?format=json`,
  ).then(res => res.json())

  teams.map((team, i) => {
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
      members,
      // etc...
    }

    // Get content digest of node. (Required field)
    const contentDigest = getHash(teamNode)

    // Add it to userNode
    teamNode.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(teamNode)
  })

  return
}
