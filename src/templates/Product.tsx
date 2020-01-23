import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { MediumContainer, Section, H1, H3 } from '../shared'

const ProductTemplate = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const {
    frontmatter: {
      title,
      description,
      image: { relativePath },
    },
    html,
  } = markdownRemark
  // Dynamically import asset as an SVG
  const imagePath = require(`../images/${relativePath}`) as string

  return (
    <Layout>
      <SEO title={name} />
      <MediumContainer>
        <Section>
          <H1>{title}</H1>
          <H3 normal>{description}</H3>
          <img src={imagePath} alt={title} />
        </Section>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </MediumContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      frontmatter {
        title
        description
        image {
          relativePath
        }
      }
    }
  }
`

export default ProductTemplate
