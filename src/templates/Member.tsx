import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import remark from 'remark'
import html from 'remark-html'

import Posts from '../components/Blog/Posts'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { DARK_GRAY } from '../constants/colors'
import {
  BORDER_RADIUS,
  DESKTOP,
  M1,
  M2,
  M3,
  M4,
  maxWidth,
  minWidth,
  PHONE,
} from '../constants/measurements'
import {
  BookOpenIcon,
  CalendarIcon,
  Card,
  Col,
  Fade,
  GitHubIcon,
  H1,
  H3,
  HomeIcon,
  HR,
  LinkedInIcon,
  LinkIcon,
  LogOutIcon,
  MediumContainer,
  P,
  Row,
  Tags,
} from '../shared'
import { IGhostPost, IMember, Subset } from '../types'
import { semesterToString } from '../helpers'

const markdownProcessor = remark().use(html)

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

const StyledCard = styled(Card) <{}>`
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
      localImage,
      roles,
      name,
      major,
      school,
      team,
      website,
      semester_joined: semesterJoined,
      posts,
    },
  } = data

  // Bios may contain markdown. Make sure to parse these into HTML!
  const [bioAsHtml, updateBioAsHtml] = useState(bio)
  markdownProcessor
    .process(bio || '')
    .then(({ contents: b }) => updateBioAsHtml(b as any))

  return (
    <Layout>
      <SEO title={name} description={bio} image={photo} />
      <MediumContainer>
        <Fade distance={M1}>
          <StyledCard shaded>
            <Row>
              {localImage?.childImageSharp.fluid && (
                <ProfilePictureWrapper>
                  <ProfilePicture fluid={localImage.childImageSharp.fluid} />
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
            <div dangerouslySetInnerHTML={{ __html: bioAsHtml ?? "" }} />
          </Fade>
        )}

        <Fade>
          <HR />
        </Fade>

        <Fade delay={500} distance={M1}>
          <Row margin={M1}>
            <Studies major={major} school={school} />
            {location && <Detail text={`From ${location}`} Icon={HomeIcon} />}
            {semesterJoined && (
              <Detail
                text={`Member since ${semesterToString(semesterJoined)}`}
                Icon={CalendarIcon}
              />
            )}
            {gradYear && (
              <Detail text={`Graduates in ${gradYear}`} Icon={LogOutIcon} />
            )}
          </Row>
        </Fade>
        {posts && posts.length > 0 ? (
          <>
            <Fade>
              <HR />
            </Fade>
            <Fade>
              <H3>Posts</H3>
            </Fade>
            <Row margin={M1}>
              <Posts posts={posts.filter(p => !p.frontmatter.draft)} />
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
      team
      website
      semester_joined
      posts {
        excerpt
        frontmatter {
          title
          slug
          customExcerpt
          draft
          coverPhoto {
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
