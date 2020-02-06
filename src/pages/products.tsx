import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  Section,
  Card,
  H3,
  P,
  Col,
  Row,
  Flex,
  WideContainer,
  Fade,
} from '../shared'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { getPathFromFileAbsolutePath } from '../helpers'
import { M2, minWidth, DESKTOP, M4 } from '../constants/measurements'
import { ProductsHero } from '../components/Products/Hero'

const Logo = styled.div<{ src: string }>`
  width: 3.6rem;
  height: 3.6rem;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.src});
  margin-right: ${M2};
  margin-bottom: 0;

  ${minWidth(DESKTOP)} {
    margin-right: ${M4};
  }
`

interface IProductCard {
  title: string
  description: string
  logoPath: string
  fileAbsolutePath: string
}

const ProductCard = ({
  title,
  description,
  fileAbsolutePath,
  logoPath,
}: IProductCard): React.ReactElement => {
  const imagePath = require(`../images/${logoPath}`)
  return (
    <Col margin={M2} sm={12} md={12} lg={6} flex>
      <Link
        to={getPathFromFileAbsolutePath(fileAbsolutePath)}
        style={{ width: '100%', display: 'flex' }}
      >
        <Card shaded hoverable clickable bordered style={{ width: '100%' }}>
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
}

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
      <WideContainer>
        <ProductsHero />
        <Section>
          <Fade distance={M2}>
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
                }) => (
                  <ProductCard
                    key={title}
                    title={title}
                    description={description}
                    fileAbsolutePath={fileAbsolutePath}
                    logoPath={relativePath}
                  />
                ),
              )}
            </Row>
          </Fade>
        </Section>
      </WideContainer>
    </Layout>
  )
}

export default ProductsPage
