import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container, H3, Section, P, Row, Col, H4, H1 } from '../shared'
import {
  MARGIN_LG,
  BORDER_RADIUS_LG,
  SHORT_ANIMATION_DURATION,
} from '../constants/measurements'
import { BLACK_ALPHA } from '../constants/colors'

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

const StyledLink = styled(Link)<{}>`
  margin: -${MARGIN_LG};
  padding: ${MARGIN_LG};
  border-radius: ${BORDER_RADIUS_LG};
  display: block;
  box-shadow: 0 0 0 ${BLACK_ALPHA(0.25)};
  transition: box-shadow ${SHORT_ANIMATION_DURATION}ms ease;
  margin-bottom: 1.45rem;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 1px 12px ${BLACK_ALPHA(0.25)};
  }
`

const Image = styled.div<{ src: string }>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.src});
  width: 100%;
  height: auto;
  padding-top: 100%;
  margin-bottom: 1.45rem;
  border-radius: ${BORDER_RADIUS_LG};
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
        <Section>
          <H1>Team</H1>
        </Section>
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
                    <StyledLink to="TODO">
                      <Image src={photo} />
                      <H4>{memberName}</H4>
                      <P sm>
                        {roles.map(({ name: roleName }) => roleName).join(', ')}
                      </P>
                      {major ? (
                        <P sm mb0>
                          Studies {major}
                          {school && ` in ${school}`}
                        </P>
                      ) : (
                        school && (
                          <P sm mb0>
                            {school}
                          </P>
                        )
                      )}
                    </StyledLink>
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
