import React from 'react'
import styled from 'styled-components'
import { ParallaxProvider } from 'react-scroll-parallax'

import Nav from './Nav'
import Footer from './Footer'
import './Layout.css'
import { ReactChildren } from '../types'
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../constants/measurements'

const Main = styled.div<{}>`
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});
`

interface ILayoutProps {
  children: ReactChildren
}

const Layout = ({ children }: ILayoutProps): React.ReactElement => {
  return (
    <ParallaxProvider>
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </ParallaxProvider>
  )
}

export default Layout
