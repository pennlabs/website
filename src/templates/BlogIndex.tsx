import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Fade, WideContainer } from '../shared'
import { IGhostPost } from '../types'
import { BlogHero } from '../components/Blog/Hero'
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
        <BlogHero />
        <Posts posts={posts} />
        <Pagination pageContext={pageContext} />
      </WideContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!) {
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
          localImage {
            childImageSharp {
              fluid(maxWidth: 484) {
                ...GatsbyImageSharpFluid
              }
            }
          }
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
