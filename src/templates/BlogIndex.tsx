import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Fade, WideContainer } from '../shared'
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
      <WideContainer>
        <Section>
          <Fade>
            <H1>Blog</H1>
          </Fade>
          <Posts posts={posts} />
          <Pagination pageContext={pageContext} />
        </Section>
      </WideContainer>
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
