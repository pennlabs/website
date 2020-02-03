import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { WideContainer } from '../shared'
import { Resources } from '../components/Resources'

const ResourcesPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Resources" />
    <WideContainer>
      <Resources />
    </WideContainer>
  </Layout>
)

export default ResourcesPage
