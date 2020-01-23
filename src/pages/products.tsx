import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Container } from '../shared'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { getPathFromFileAbsolutePath } from '../helpers'

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
          {products.map(
            ({
              node: {
                fileAbsolutePath,
                frontmatter: { title },
              },
            }) => (
              <div key={title}>
                <Link to={getPathFromFileAbsolutePath(fileAbsolutePath)}>
                  {title}
                </Link>
              </div>
            ),
          )}
        </Section>
      </Container>
    </Layout>
  )
}

export default ProductsPage
