import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container, H3, Section, P, Row, H1 } from '../shared'
import { MARGIN_LG } from '../constants/measurements'
import { TeamMemberPreview } from '../components/Team/TeamMemberPreview'
import { ITeam, IMember } from '../shared/Icons/types'

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
        <Section>
          <H1>Team</H1>
        </Section>
        {teams.map(({ name, description, children: members }: ITeam) => (
          <Section key={name}>
            <H3>{name}</H3>
            <P>{description}</P>

            <Row margin={MARGIN_LG}>
              {members.map((props: IMember) => (
                <TeamMemberPreview {...props} />
              ))}
            </Row>
          </Section>
        ))}
      </Container>
    </Layout>
  )
}

export default AboutPage
