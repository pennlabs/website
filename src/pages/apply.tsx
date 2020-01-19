import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Apply } from '../components/Apply'

const ApplyPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Apply" />
    <Apply />
  </Layout>
)

export default ApplyPage
