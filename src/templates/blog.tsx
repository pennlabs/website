import React from 'react'

import { graphql, Link } from 'gatsby'


import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Container } from '../shared'

const BlogPage = ({data}): React.ReactElement => {
  const posts = data.allGhostPost.edges

  return (
    <Layout>
      <SEO title="Blog" />
      <Container>
        <Section>
          <H1>Blog</H1>
          <ul>
            {posts.map(({ node: post }) => (
              <li key={post.slug}><Link to={`/blog/post/${post.slug}/`}>{post.title}</Link></li>
            ))}
          </ul>
        </Section>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          slug,
          title
        }
      }
    }
  }
`

export default BlogPage
