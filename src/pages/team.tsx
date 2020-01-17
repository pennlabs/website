import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container, H3, Section, P, Row, Col, H4 } from '../shared'
import { MARGIN_LG } from '../constants/measurements'

interface IRole {
  name: string
}

interface IMember {
  student: {
    name: string
    major?: string
    school?: string
  }
  roles: IRole[]
  github?: string
  linkedin?: string
  photo?: string
  website?: string
  year_joined?: string
}

interface ITeam {
  name: string
  description: string
  members: IMember[]
}

const Image = styled.div<{ src: string }>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.src});
  width: 100%;
  height: auto;
  padding-top: 100%;
  margin-bottom: 1.45rem;
`

const AboutPage = (): React.ReactElement => {
  const {
    allTeam: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allTeam {
          edges {
            node {
              members {
                student {
                  name
                  major
                  school
                }
                github
                linkedin
                photo
                website
                year_joined(formatString: "YYYY")
                roles {
                  name
                }
              }
              name
              description
            }
          }
        }
      }
    `,
  )

  // TODO render other info
  const teams: ITeam[] = edges.map(({ node }) => node)

  return (
    <Layout>
      <SEO title="Team" />
      <Container>
        {teams.map(({ name, description, members }: ITeam) => (
          <Section key={name}>
            <H3>{name}</H3>
            <P>{description}</P>

            <Row margin={MARGIN_LG}>
              {members.map(
                ({
                  student: { name: memberName, major, school },
                  roles,
                  github,
                  linkedin,
                  photo,
                  website,
                  year_joined,
                }) => (
                  <Col
                    margin={MARGIN_LG}
                    sm={12}
                    md={6}
                    lg={3}
                    key={`${memberName}-${major}-${school}-${year_joined}`}
                  >
                    <Image src={photo} />
                    <H4>{memberName}</H4>
                    <P sm>{roles.map(({ name }) => name).join(', ')}</P>
                    {major ? (
                      <P sm>
                        Studies {major}
                        {school && ` in ${school}`}
                      </P>
                    ) : (
                      school && <P sm>{school}</P>
                    )}
                  </Col>
                ),
              )}
            </Row>
          </Section>
        ))}
      </Container>
    </Layout>
  )
}

export default AboutPage
