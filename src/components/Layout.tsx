import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Nav from './Nav'
import Footer from './Footer'
import './Layout.css'
import { ReactChildren } from '../types'

interface ILayoutProps {
  children: ReactChildren
}

const Layout = ({ children }: ILayoutProps): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Nav siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
