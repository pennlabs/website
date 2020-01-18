import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Container } from '../shared'

const ResourcesPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Resources" />
    <Container>
      <Section>
        <H1>Resources</H1>
      </Section>
    </Container>
  </Layout>
)

export default ResourcesPage
