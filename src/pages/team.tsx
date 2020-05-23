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
    allTeamsJson: { nodes: teams },
  },
}): React.ReactElement => {
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
      nodes {
        name
        description
        members {
          name
          team
          pennkey
          photo
          semester_joined
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
