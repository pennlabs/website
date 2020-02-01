import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { TEAM_MEMBER_ROUTE } from '../../constants/routes'
import { IGhostAuthor, IMember } from '../../types'

const InlineListElement = styled.span`
  &:not(:last-child) {
    &:after {
      content: ', ';
    }
  }
`

const BylineContainer = styled.div`
  font-size: 0.75rem;
  padding-bottom: 1rem;
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

  if (authorsAsMembers.length === 0) {
    return <BylineContainer />
  }

  return (
    <BylineContainer>
      By{' '}
      {authorsAsMembers.map(({ url, student: { name } }) => (
        <InlineListElement key={url}>
          <Link to={TEAM_MEMBER_ROUTE(url)}>{name}</Link>
        </InlineListElement>
      ))}
    </BylineContainer>
  )
}

export default Byline
