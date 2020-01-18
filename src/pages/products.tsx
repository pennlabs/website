import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Container } from '../shared'

const ProductsPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Products" />
    <Container>
      <Section>
        <H1>Products</H1>
      </Section>
    </Container>
  </Layout>
)

export default ProductsPage
