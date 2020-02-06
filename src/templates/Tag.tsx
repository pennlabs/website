import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Posts from '../components/Blog/Posts'

import { Section, H1, WideContainer, P } from '../shared'
import { IGhostTag, IGhostPost } from '../types'
import Pagination from '../shared/Pagination'

interface ITagTemplateProps {
  data: {
    ghostTag: IGhostTag
    allGhostPost: {
      edges: Array<{ node: IGhostPost }>
    }
  }
  pageContext: object
}

const TagTemplate = ({ data, pageContext }: ITagTemplateProps) => {
  const { name, description, feature_image } = data.ghostTag
  const { edges: postNodes } = data.allGhostPost

  const posts = postNodes.map(({ node: post }) => post)

  return (
    <Layout>
      <SEO title={name} description={description} image={feature_image} />
      <WideContainer>
        <Section>
          <H1>{name}</H1>
          <P>{description}</P>
          <Posts posts={posts} />
          <Pagination pageContext={pageContext} />
        </Section>
      </WideContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $limit: Int!, $skip: Int!) {
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
