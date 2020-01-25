import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Posts from '../components/Blog/Posts'

import { Section, H1, WideContainer } from '../shared'

const TagTemplate = ({ data }) => {
  const { name, description } = data.ghostTag
  const { edges: postNodes } = data.allGhostPost

  const posts = postNodes.map(({ node: post }) => post)

  return (
    <Layout>
      <SEO title={name} description={description} />
      <WideContainer>
        <Section>
          <H1>{name}</H1>
          <Posts posts={posts} />
        </Section>
      </WideContainer>
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
          excerpt
          feature_image
        }
      }
    }
  }
`

export default TagTemplate
