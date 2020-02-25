import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { WideContainer } from '../shared'
import { ITeam } from '../types'
import { TeamHero } from '../components/Team/Hero'
import { Teams } from '../components/Team/Teams'

const TeamPage = ({
  data: {
    allTeamsJson: { edges: teamEdges },
    allMembersJson: { edges: memberEdges },
  },
}): React.ReactElement => {
  const teams: ITeam[] = teamEdges.map(({ node }) => ({ members: [], ...node }))
  const nameToTeam = {}
  teams.forEach(t => {
    nameToTeam[t.name] = t
  })
  memberEdges.forEach(({ node: mem }) => {
    const { team: teamName } = mem
    const team = nameToTeam[teamName]
    if (team) {
      team.members.push(mem)
    }
  })

  return (
    <Layout>
      <SEO title="Team" />
      <WideContainer>
        <TeamHero />
        <Teams teams={teams} />
      </WideContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allTeamsJson {
      edges {
        node {
          name
          description
        }
      }
    }
    allMembersJson {
      edges {
        node {
          name
          team
          pennkey
          photo
          year_joined(formatString: "YYYY")
          roles
          localImage {
            childImageSharp {
              fluid(maxWidth: 612) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default TeamPage
