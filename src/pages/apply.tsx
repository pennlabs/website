import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Apply } from '../components/Apply'
import { WideContainer } from '../shared'

const ApplyPage = (): React.ReactElement => (
  <Layout>
    <WideContainer>
      <SEO title="Apply" />
      <Apply />
    </WideContainer>
  </Layout>
)

export default ApplyPage
