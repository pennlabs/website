import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container } from '../shared'
import { Apply } from '../components/Apply'

const ApplyPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Apply" />
    <Container>
      <Apply />
    </Container>
  </Layout>
)

export default ApplyPage
