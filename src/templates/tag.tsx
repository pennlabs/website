import React from 'react'
import { graphql, Link } from 'gatsby'
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
import { BLOG_POST_ROUTE } from '../constants/routes'

const TagTemplate = ({ data, location, pageContext }) => {
  const { name, description } = data.ghostTag
  const { edges: posts } = data.allGhostPost

  return (
    <Layout>
      <SEO title={name} description={description} />
      <MediumContainer>
        <Section>
          <h1>{name}</h1>
          <ul>
            {posts.map(({ node: post }) => (
              <li key={post.slug}><Link to={BLOG_POST_ROUTE(post.slug)}>{post.title}</Link></li>
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
