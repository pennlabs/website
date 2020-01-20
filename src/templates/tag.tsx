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

const TagTemplate = ({ data, location, pageContext }) => {
  const tag = data.ghostTag
  const posts = data.allGhostPost.edges

  return (
    <Layout>
      <SEO title={tag.name} />
      <MediumContainer>
        <Section>
          <h1>{tag.name}</h1>
          <ul>
            {posts.map(({ node: post }) => (
              <li key={post.slug}>{post.title}</li>
            ))}
          </ul>
        </Section>
      </MediumContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostTag(slug: { eq: $slug }) {
      name
      description
      slug
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`

export default TagTemplate
