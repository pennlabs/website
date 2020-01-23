import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  MediumContainer,
  Section,
  H1,
  H3,
  LinkChevronRightIcon,
} from '../shared'
import { PRODUCTS_ROUTE } from '../constants/routes'

const ProductTemplate = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const {
    frontmatter: { title, description, image },
    html,
  } = markdownRemark
  const { relativePath } = image || {}

  // Dynamically import asset as an SVG
  const imagePath: string | null = relativePath
    ? require(`../images/${relativePath}`)
    : null

  return (
    <Layout>
      <SEO title={name} />
      <MediumContainer>
        <Section>
          <H1>{title}</H1>
          <H3 normal>{description}</H3>
          {imagePath && <img src={imagePath} alt={title} />}
        </Section>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Section>
          <Link to={PRODUCTS_ROUTE}>
            View all products <LinkChevronRightIcon />
          </Link>
        </Section>
      </MediumContainer>
    </Layout>
  )
}

// NOTE fileAbsolutePath is passed from the context in `gatsby-node.js`
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
