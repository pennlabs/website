import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const NotFoundPage = (): React.ReactElement => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Not Found</h1>
    <p>The page you were looking for does not exist.</p>
  </Layout>
)

export default NotFoundPage
