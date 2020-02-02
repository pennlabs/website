import React from 'react'
import styled from 'styled-components'
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
  Fade,
  LinkExternalLinkIcon,
  BtnAnchor,
  EBtnSize,
  Buttons,
} from '../shared'
import { ProductOverview } from '../components/Products/ProductOverview'
import { PRODUCTS_ROUTE } from '../constants/routes'
import { M4, M2 } from '../constants/measurements'

const Logo = styled.img<{}>`
  height: 3.2rem;
  margin-bottom: ${M4};
  display: inline-block;
`

const ProductTemplate = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const {
    frontmatter: {
      title,
      description,
      image,
      justifyImage,
      link,
      appStoreLink,
      googlePlayLink,
      logo: { relativePath: logoRelativePath },
    },
    html,
  } = markdownRemark
  const { relativePath } = image || {}

  // Dynamically import asset as an SVG
  const imagePath: string | undefined = relativePath
    ? require(`../images/${relativePath}`)
    : undefined

  const logoPath = require(`../images/${logoRelativePath}`)

  return (
    <Layout>
      <SEO title={title} />
      <ProductOverview imagePath={imagePath} justifyImage={justifyImage}>
        <Fade delay={400}>
          <Logo src={logoPath} alt={title} />
        </Fade>
        <Fade delay={450}>
          <H1>{title}</H1>
        </Fade>
        <Fade delay={500}>
          <H3 normal>{description}</H3>
        </Fade>
        <Fade delay={550}>
          <Buttons>
            {link && (
              <BtnAnchor href={link} target="_BLANK" size={EBtnSize.SM}>
                Website <LinkExternalLinkIcon />
              </BtnAnchor>
            )}
            {appStoreLink && (
              <BtnAnchor href={link} target="_BLANK" size={EBtnSize.SM}>
                App Store <LinkExternalLinkIcon />
              </BtnAnchor>
            )}
            {googlePlayLink && (
              <BtnAnchor href={link} target="_BLANK" size={EBtnSize.SM}>
                Google Play <LinkExternalLinkIcon />
              </BtnAnchor>
            )}
          </Buttons>
        </Fade>
      </ProductOverview>
      <MediumContainer>
        <Fade distance={M2}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Fade>
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
        link
        appStoreLink
        googlePlayLink
        image {
          relativePath
        }
        logo {
          relativePath
        }
      }
    }
  }
`

export default ProductTemplate
