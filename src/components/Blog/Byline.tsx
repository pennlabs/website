import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { FluidObject, GatsbyImageProps } from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'

import { TEAM_MEMBER_ROUTE, HOME_ROUTE } from '../../constants/routes'
import { IGhostAuthor, IMember } from '../../types'
import { M1, M2, maxWidth } from '../../constants/measurements'

const THUMBNAIL_SIZE = '40px'

const ThumbnailWrapper = styled.div`
  margin-right: ${M1};
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
`

const Thumbnail = styled(BackgroundImage)`
  width: ${THUMBNAIL_SIZE};
  height: ${THUMBNAIL_SIZE};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 0;
`

const AuthorLink = styled(Link)`
  margin-right: ${M2};
  display: flex;
  align-items: center;
`

const BylineContainer = styled.div`
  padding-bottom: ${M2};
  width: 100%;
  display: flex;
  align-items: center;

  ${maxWidth('400px')} {
    display: block;
    padding-bottom: 0;

    > a {
      margin-bottom: ${M2};
    }
  }
`

interface IBylineProps {
  authors?: IGhostAuthor[]
  authorsAsMembers?: IMember[]
}

const Byline = ({ authors, authorsAsMembers }: IBylineProps) => {
  const {
    allMember: { edges: members },
    pennLabsLogoImg: {
      childImageSharp: { fluid: pennLabsLogoFluid },
    },
  } = useStaticQuery(graphql`
    query {
      allMember {
        edges {
          node {
            url
            student {
              name
            }
          }
        }
      }
      pennLabsLogoImg: file(relativePath: { eq: "labs-logo-gray.png" }) {
        childImageSharp {
          fluid(maxWidth: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  // This is really pretty ugly. But for some reason, GraphQL isn't picking up on the ghost <> labs
  // foreign key when the authors are in a list like they are under posts -- in that case,
  // the type seems to be GhostPostAuthor instead of GhostAuthor, which doesn't trigger
  // an event in gatsby-node.js.
  const slugToMember = {}
  members.forEach(({ node: m }) => {
    slugToMember[m.url] = m
  })

  if (!authorsAsMembers) {
    authorsAsMembers = authors
      .map(({ slug }) => slugToMember[slug])
      .filter(mem => Boolean(mem))
  }

  // If there are no authors
  if (authorsAsMembers.length === 0) {
    return (
      <BylineContainer>
        <AuthorLink to={HOME_ROUTE}>
          <ThumbnailWrapper>
            <Thumbnail fluid={pennLabsLogoFluid as FluidObject} />
          </ThumbnailWrapper>{' '}
          Penn Labs
        </AuthorLink>
      </BylineContainer>
    )
  }

  const getMemberImage = (localImage: { childImageSharp: GatsbyImageProps }) =>
    (localImage &&
      localImage.childImageSharp &&
      localImage.childImageSharp.fluid) ||
    pennLabsLogoFluid

  return (
    <BylineContainer>
      {authorsAsMembers.map(({ url, localImage, student: { name } }) => (
        <AuthorLink key={url} to={TEAM_MEMBER_ROUTE(url)}>
          <ThumbnailWrapper>
            <Thumbnail fluid={getMemberImage(localImage)} />
          </ThumbnailWrapper>
          <span>{name}</span>
        </AuthorLink>
      ))}
    </BylineContainer>
  )
}

export default Byline
