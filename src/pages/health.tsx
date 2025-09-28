import * as React from 'react'
import type { PageProps } from 'gatsby'

const HealthPage: React.FC<PageProps> = () => {
  // Check user agent on the client side
  React.useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent !== 'service-status') {
      window.location.href = '/'
    }
  }, [])

  return <div>OK</div>
}

export default HealthPage
