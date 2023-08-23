import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { FluidObject, GatsbyImageFluidProps, GatsbyImageProps } from 'gatsby-image'
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
  authors: IMember[]
}

const Byline = ({ authors }: { authors: IMember[] }) => {
  const {
    pennLabsLogoImg: {
      childImageSharp: { fluid: pennLabsLogoFluid },
    },
  } = useStaticQuery(graphql`
    query {
      pennLabsLogoImg: file(relativePath: { eq: "labs-logo-gray.png" }) {
        childImageSharp {
          fluid(maxWidth: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  // If there are no authors
  if ((authors || []).length === 0) {
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

  const getMemberImage = (localImage: { childImageSharp: GatsbyImageFluidProps }) =>
    (localImage &&
      localImage.childImageSharp &&
      localImage.childImageSharp.fluid) ||
    pennLabsLogoFluid

  return (
    <BylineContainer>
      {authors.map(({ pennkey, localImage, name }) => (
        <AuthorLink key={pennkey} to={TEAM_MEMBER_ROUTE(pennkey)}>
          <ThumbnailWrapper>
            {localImage && <Thumbnail fluid={getMemberImage(localImage)} />}
          </ThumbnailWrapper>
          <span>{name}</span>
        </AuthorLink>
      ))}
    </BylineContainer>
  )
}

export default Byline
