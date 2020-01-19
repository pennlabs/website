import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { IMember, Subset } from '../shared/Icons/types'
import {
  Section,
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
  WideContainer,
  MediumContainer,
} from '../shared'
import {
  M2,
  BORDER_RADIUS_LG,
  M1,
  M3,
  maxWidth,
  PHONE,
  M4,
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

const ProfilePicture = styled.div<{ src: string }>`
  height: 10.4rem;
  width: 10.4rem;
  margin-right: ${M2};
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${BORDER_RADIUS_LG};

  ${maxWidth(PHONE)} {
    margin-right: 0;
    margin-bottom: ${M3};
  }
`

interface IMemberTemplateProps {
  data: {
    member: IMember
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
    member: {
      bio,
      github,
      graduation_year: gradYear,
      linkedin,
      location,
      photo,
      roles,
      student: { name, major, school },
      team,
      website,
      year_joined: yearJoined,
    },
  } = data

  const roleNames = roles.map(({ name: roleName }) => roleName)

  return (
    <Layout>
      <SEO title={name} />
      <MediumContainer>
        <Section>
          <Row style={{ marginBottom: M3 }}>
            {photo && <ProfilePicture src={photo} />}
            <Col flex>
              <div style={{ width: '100%', alignSelf: 'center' }}>
                <H1 mb2>{name}</H1>
                <div style={{ marginBottom: M1 }}>
                  <Tags tags={roleNames} />
                </div>
                <P mb2>Part of {team}</P>
                <Links github={github} linkedin={linkedin} website={website} />
              </div>
            </Col>
          </Row>
        </Section>

        {bio && <div dangerouslySetInnerHTML={{ __html: bio }} />}

        <Section>
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
        </Section>
      </MediumContainer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    member(id: { eq: $id }) {
      bio
      github
      graduation_year
      linkedin
      location
      photo
      roles {
        name
      }
      student {
        name
        major
        school
      }
      team
      website
      year_joined(formatString: "YYYY")
    }
  }
`

export default MemberTemplate
