import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Container, Card, H3, P, Col, Row, Flex } from '../shared'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { getPathFromFileAbsolutePath } from '../helpers'
import { M2, minWidth, DESKTOP, M4 } from '../constants/measurements'

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
    }
  `)

  return (
    <Layout>
      <SEO title="Products" />
      <Container>
        <Section>
          <H1>Products</H1>
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
                      <Card shaded hoverable clickable>
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
      </Container>
    </Layout>
  )
}

export default ProductsPage
