import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Container } from '../shared'

const BlogPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Blog" />
    <Container>
      <Section>
        <H1>Blog</H1>
      </Section>
    </Container>
  </Layout>
)

export default BlogPage
