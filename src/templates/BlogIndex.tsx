import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Fade, WideContainer } from '../shared'
import { IGhostPost, IPost } from '../types'
import { BlogHero } from '../components/Blog/Hero'
import Posts from '../components/Blog/Posts'
import Pagination from '../shared/Pagination'

interface IBlogTemplateProps {
  data: {
    allMarkdownRemark: {
      nodes: IPost[]
    }
  }
  pageContext: object
}

const BlogPage = ({
  data,
  pageContext,
}: IBlogTemplateProps): React.ReactElement => {
  const {
    allMarkdownRemark: { nodes: posts },
  } = data

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
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: false } }
      }
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: [frontmatter___publishedAt] }
    ) {
      nodes {
        excerpt
        frontmatter {
          slug
          title
          customExcerpt
          coverPhoto {
            childImageSharp {
              fluid(maxWidth: 484) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPage
