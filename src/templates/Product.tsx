import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  MediumContainer,
  Section,
  H1,
  H3,
  BtnLink,
  LinkChevronRightIcon,
} from '../shared'
import { ProductOverview } from '../components/Products/ProductOverview'
import { PRODUCTS_ROUTE } from '../constants/routes'

const ProductTemplate = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const {
    frontmatter: { title, description, image, justifyImage },
    html,
  } = markdownRemark
  const { relativePath } = image || {}

  // Dynamically import asset as an SVG
  const imagePath: string | undefined = relativePath
    ? require(`../images/${relativePath}`)
    : undefined

  return (
    <Layout>
      <SEO title={name} />
      <ProductOverview imagePath={imagePath} justifyImage={justifyImage}>
        <H1>{title}</H1>
        <H3 normal>{description}</H3>
      </ProductOverview>
      <MediumContainer>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Section style={{ textAlign: 'center' }}>
          <BtnLink to={PRODUCTS_ROUTE}>
            View all products <LinkChevronRightIcon />
          </BtnLink>
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
        justifyImage
        image {
          relativePath
        }
      }
    }
  }
`

export default ProductTemplate
