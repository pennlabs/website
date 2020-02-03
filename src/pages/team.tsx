import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container, Section, P, Row, H1, H2, Col, Hero, Fade } from '../shared'
import { M2 } from '../constants/measurements'
import { TeamMemberPreview } from '../components/Team/TeamMemberPreview'
import { ITeam, IMember } from '../types'
import { TeamHero } from '../components/Team/Hero'

const AboutPage = (): React.ReactElement => {
  const {
    allTeam: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allTeam {
          edges {
            node {
              name
              description
              children {
                ... on Member {
                  id
                  student {
                    name
                  }
                  photo
                  url
                  year_joined(formatString: "YYYY")
                  roles {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  )

  const teams: ITeam[] = edges.map(({ node }) => node)

  return (
    <Layout>
      <SEO title="Team" />
      <Container>
        <TeamHero />
        {teams.map(({ name, description, children: members }: ITeam) => (
          <Fade key={name} distance="1rem">
            <Section key={name}>
              <H2 mb2>{name}</H2>
              <Row>
                <Col sm={12} md={10} lg={8}>
                  <P mb4>{description}</P>
                </Col>
              </Row>

              <Row margin={M2}>
                {members.map((props: IMember) => (
                  <TeamMemberPreview {...props} />
                ))}
              </Row>
            </Section>
          </Fade>
        ))}
      </Container>
    </Layout>
  )
}

export default AboutPage
