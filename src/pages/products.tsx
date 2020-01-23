import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  H1,
  Section,
  Card,
  H3,
  P,
  Col,
  Row,
  Flex,
  WideContainer,
} from '../shared'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { getPathFromFileAbsolutePath } from '../helpers'
import { M2, minWidth, DESKTOP, M4 } from '../constants/measurements'

const TextWrapper = styled.div<{}>`
  align-self: center;
`

const Logo = styled.img<{}>`
  width: 3.6rem;
  height: 3.6rem;
  object-fit: contain;
  margin-right: ${M2};
  margin-bottom: 0;

  ${minWidth(DESKTOP)} {
    margin-right: ${M4};
  }
`

const ProductsPage = (): React.ReactElement => {
  const {
    allMarkdownRemark: { edges: products },
    file: { childImageSharp },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              description
              logo {
                relativePath
              }
            }
          }
        }
      }
      file(relativePath: { eq: "test-products-hero.png" }) {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Products" />
      <WideContainer>
        <Section>
          <Row margin={M2}>
            <Col sm={12} md={6} margin={M2} flex>
              <TextWrapper>
                <H1 mb1>Products</H1>
                <H3 style={{ fontWeight: 400 }}>TODO</H3>
                <P>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </P>
              </TextWrapper>
            </Col>
            <Col sm={12} md={6} margin={M2}>
              <Img style={{ width: '100%' }} fluid={childImageSharp.fluid} />
            </Col>
          </Row>
        </Section>
        <Section>
          <Row margin={M2}>
            {products.map(
              ({
                node: {
                  fileAbsolutePath,
                  frontmatter: {
                    title,
                    description,
                    logo: { relativePath },
                  },
                },
              }) => {
                const imagePath = require(`../images/${relativePath}`)
                return (
                  <Col key={title} margin={M2} sm={12} md={6}>
                    <Link to={getPathFromFileAbsolutePath(fileAbsolutePath)}>
                      <Card shaded hoverable clickable bordered>
                        <Flex>
                          <Logo src={imagePath} alt={`${title} logo`} />
                          <Col>
                            <H3 mb1>{title}</H3>
                            <P mb0>{description}</P>
                          </Col>
                        </Flex>
                      </Card>
                    </Link>
                  </Col>
                )
              },
            )}
          </Row>
        </Section>
      </WideContainer>
    </Layout>
  )
}

export default ProductsPage
