import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { TEAM_MEMBER_ROUTE } from '../../constants/routes'
import { IGhostAuthor, IMember } from '../../types'
import { M1, M2, maxWidth } from '../../constants/measurements'

const Thumbnail = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  object-fit: cover;
  margin-right: ${M1};
  border-radius: 50%;
  display: inline-block;
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
  font-size: 80%;

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
  } = useStaticQuery(graphql`
    query {
      allMember {
        edges {
          node {
            url
            photo
            student {
              name
            }
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
    return null
  }

  return (
    <BylineContainer>
      {authorsAsMembers.map(({ url, photo, student: { name } }) => (
        <AuthorLink key={url} to={TEAM_MEMBER_ROUTE(url)}>
          <Thumbnail src={photo} />
          <span>{name}</span>
        </AuthorLink>
      ))}
    </BylineContainer>
  )
}

export default Byline
