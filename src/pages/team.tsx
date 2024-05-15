import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Col, Fade, H1, H2, P, Row, Section, WideContainer } from '../shared'
import { IMember } from '../types'
import { TeamHero } from '../components/Team/Hero'
import { Teams } from '../components/Team/Teams'
import { M2 } from '../constants/measurements'

const PriorContributors = ({ data: alumni }): React.ReactElement => {
  return (
    <Fade distance="1rem">
      <Section>
        <H2 mb2>Prior Contributors</H2>
        <Row>
          <Col sm={12} md={10} lg={8}>
            <P mb4>
              These are the people who have helped make Penn Labs what it is
              today. We are grateful for their contributions and wish them the
              best in their future endeavors.
            </P>
            <P>
              We are missing some of our prior contributors from Labs' earlier
              days. If you know someone who should be on this list, please let
              us know at{' '}
              <a href="mailto:contact@pennlabs.org">contact@pennlabs.org</a>.
            </P>
          </Col>
        </Row>
        <Row margin={M2}>
          {alumni.map((props: IMember) => (
            <Col key={props.pennkey} sm={12} md={3} margin={M2} flex>
              <Link to={`/alumni/${props.pennkey}`}>
                <P mb0>{props.name}</P>
              </Link>
            </Col>
          ))}
        </Row>
      </Section>
    </Fade>
  )
}

const TeamPage = ({
  data: {
    allTeamsJson: { nodes: teams },
    allAlumniJson: { nodes: alumni },
  },
}): React.ReactElement => {
  return (
    <Layout>
      <SEO title="Team" />
      <WideContainer>
        <TeamHero />
        <Teams teams={teams} />
        <PriorContributors data={alumni} />
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
          team {
            name
          }
          pennkey
          photo
          semester_joined
          alumnus
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
    allAlumniJson {
      nodes {
        name
        team
        pennkey
        photo
        semester_joined
        alumnus
        roles
      }
    }
  }
`

export default TeamPage
