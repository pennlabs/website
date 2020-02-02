import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { WideContainer, Blob2 } from '../shared'
import { Resources } from '../components/Resources'

const ResourcesPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Resources" />
    <Blob2 style={{ transform: 'rotate(180deg)', left: 0 }} />
    <WideContainer>
      <Resources />
    </WideContainer>
  </Layout>
)

export default ResourcesPage
