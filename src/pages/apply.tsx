import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { H1, Section, Container } from '../shared'

const ApplyPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Apply" />
    <Container>
      <Section>
        <H1>Apply</H1>
      </Section>
    </Container>
  </Layout>
)

export default ApplyPage
