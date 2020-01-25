import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  H1,
  H4,
  Section,
  Container,
  Card,
  P,
  Flex,
  VFlex,
  Hero,
} from '../shared'
import { BLOG_POST_ROUTE, TEAM_MEMBER_ROUTE } from '../constants/routes'
import { BORDER_RADIUS } from '../constants/measurements'
import { IGhostPost } from '../types'
import Posts from '../components/Blog/Posts'
import Pagination from '../shared/Pagination'

interface IBlogTemplateProps {
  data: {
    allGhostPost: {
      edges: Array<{ node: IGhostPost }>
    }
  }
  pageContext: object
}

const BlogPage = ({
  data,
  pageContext,
}: IBlogTemplateProps): React.ReactElement => {
  const {
    allGhostPost: { edges: postNodes },
  } = data

  const posts = postNodes.map(({ node: post }) => post)

  return (
    <Layout>
      <SEO title="Blog" />
      <Container>
        <Section>
          <H1>Blog</H1>
          <Posts posts={posts} />
          <Pagination pageContext={pageContext} />
        </Section>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          slug
          title
          excerpt
          feature_image
          tags {
            slug
            name
          }
          authors {
            slug
          }
        }
      }
    }
  }
`

export default BlogPage
