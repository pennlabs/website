import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Posts from '../components/Blog/Posts'
import { IMember, Subset, IGhostPost } from '../types'
import {
  H1,
  P,
  Tags,
  GitHubIcon,
  LinkedInIcon,
  LinkIcon,
  Row,
  Col,
  BookOpenIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  MediumContainer,
  Card,
  HR,
  H3,
  Fade,
} from '../shared'
import {
  M2,
  BORDER_RADIUS,
  M1,
  M3,
  maxWidth,
  PHONE,
  M4,
  minWidth,
  DESKTOP,
} from '../constants/measurements'
import { DARK_GRAY } from '../constants/colors'

type ILinks = Subset<
  IMember,
  {
    github?: string
    linkedin?: string
    website?: string
  }
>

const LinksTag = styled.div<{}>`
  a {
    color: ${DARK_GRAY} !important;
    opacity: 0.5;
    margin-right: ${M2};
    transform: scale(0.8);

    svg {
      stroke-width: 1.8px;
    }

    :hover,
    :focus,
    :active {
      opacity: 0.75;
    }
  }
`

const StyledCard = styled(Card)<{}>`
  padding: ${M4};
  margin-top: ${M2};

  ${minWidth(DESKTOP)} {
    margin-top: 7.5vh;
  }

  ${maxWidth(PHONE)} {
    padding: ${M2};
  }
`

const Links = ({ github, linkedin, website }: ILinks) => (
  <LinksTag>
    {github && (
      <a href={github} target="_BLANK">
        <GitHubIcon />
      </a>
    )}
    {linkedin && (
      <a href={linkedin} target="_BLANK">
        <LinkedInIcon />
      </a>
    )}
    {website && (
      <a href={website} target="_BLANK">
        <LinkIcon />
      </a>
    )}
  </LinksTag>
)

const ProfilePictureWrapper = styled.div`
  border-radius: ${BORDER_RADIUS};
  overflow: hidden;
  margin-right: ${M2};
  margin-bottom: 0;

  ${maxWidth(DESKTOP)} {
    margin-bottom: ${M3};
  }

  ${maxWidth(PHONE)} {
    margin-right: 0;
  }

  ${minWidth(DESKTOP)} {
    margin-right: ${M4};
  }
`

const ProfilePicture = styled(BackgroundImage)`
  height: 10.4rem;
  width: 10.4rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 0;

  ${maxWidth(PHONE)} {
    width: 100%;
    height: auto;
    padding-top: 100%;
  }
`

interface IMemberTemplateProps {
  data: {
    membersJson: IMember
    allGhostPost: {
      edges: Array<{ node: IGhostPost }>
    }
  }
}

const Detail = ({ text, Icon }) => {
  if (!text) return null
  return (
    <Col sm={12} margin={M1}>
      <Icon
        style={{
          transform: 'scale(0.8)',
          position: 'absolute',
          color: DARK_GRAY,
          opacity: 0.8,
          marginTop: '-2px',
        }}
      />
      <P sm style={{ marginLeft: M4 }} mb2>
        {text}
      </P>
    </Col>
  )
}

const Studies = ({ major, school }: { major?: string; school?: string }) => {
  const getStudiesText = (): string | null => {
    if (!major && !school) return null
    if (!major) return `Studies in ${school}`
    if (!school) return `Studies ${major}`
    return `Studies ${major} in ${school}`
  }

  return <Detail text={getStudiesText()} Icon={BookOpenIcon} />
}

const MemberTemplate = ({ data }: IMemberTemplateProps) => {
  const {
    membersJson: {
      bio,
      github,
      graduation_year: gradYear,
      linkedin,
      hometown: location,
      photo,
      localImage: {
        childImageSharp: { fluid },
      },
      roles,
      name,
      major,
      school,
      team,
      website,
      year_joined: yearJoined,
    },
    allGhostPost: { edges: postEdges },
  } = data

  const posts = postEdges.map(({ node }) => node)

  return (
    <Layout>
      <SEO title={name} description={bio} image={photo} />
      <MediumContainer>
        <Fade distance={M1}>
          <StyledCard shaded>
            <Row>
              {fluid && (
                <ProfilePictureWrapper>
                  <ProfilePicture fluid={fluid} />
                </ProfilePictureWrapper>
              )}
              <Col flex>
                <div style={{ width: '100%', alignSelf: 'center' }}>
                  <H1 mb2>{name}</H1>
                  <div style={{ marginBottom: M1 }}>
                    <Tags tags={roles} />
                  </div>
                  <P mb2>Part of {team}</P>
                  <Links
                    github={github}
                    linkedin={linkedin}
                    website={website}
                  />
                </div>
              </Col>
            </Row>
          </StyledCard>
        </Fade>

        {bio && (
          <Fade distance={M1} delay={450}>
            <div dangerouslySetInnerHTML={{ __html: bio }} />
          </Fade>
        )}

        <Fade>
          <HR />
        </Fade>

        <Fade delay={500} distance={M1}>
          <Row margin={M1}>
            <Studies major={major} school={school} />
            {location && <Detail text={`From ${location}`} Icon={HomeIcon} />}
            {yearJoined && (
              <Detail text={`Member since ${yearJoined}`} Icon={CalendarIcon} />
            )}
            {gradYear && (
              <Detail text={`Graduates in ${gradYear}`} Icon={LogOutIcon} />
            )}
          </Row>
        </Fade>
        {posts.length > 0 ? (
          <>
            <Fade>
              <HR />
            </Fade>
            <Fade>
              <H3>Posts</H3>
            </Fade>
            <Row margin={M1}>
              <Posts posts={posts} />
            </Row>
          </>
        ) : null}
      </MediumContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($pennkey: String!) {
    membersJson(pennkey: { eq: $pennkey }) {
      bio
      github
      graduation_year
      linkedin
      hometown
      photo
      roles
      name
      major
      school
      localImage {
        childImageSharp {
          fluid(maxWidth: 484) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      team
      website
      year_joined(formatString: "YYYY")
    }
    allGhostPost(
      filter: { authors: { elemMatch: { slug: { eq: $pennkey } } } }
    ) {
      edges {
        node {
          slug
          title
          excerpt
          localImage {
            childImageSharp {
              fluid(maxWidth: 484) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default MemberTemplate
